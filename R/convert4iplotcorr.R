## convert4iplotcorr
## Karl W Broman

# Convert data to JSON format for iplotCorr vis
#
# @param dat Data matrix (individuals x variables)
# @param group Optional vector of groups of individuals (e.g., a genotype)
# @param rows Rows of correlation matrix to keep in image
# @param cols Columns of correlation matrix to keep in image
# @param reorder If TRUE, reorder the variables by clustering
# @param corr Correlation matrix
#
# @return Character string with the input data in JSON format
#
#' @importFrom RJSONIO toJSON
#' @importFrom stats hclust
#
# @keywords interface
# @seealso \code{\link{iplotCorr}}
#
# @examples
# data(geneExpr)
# geneExpr_as_json <- convert4iplotcorr(geneExpr$expr, geneExpr$genotype)
convert4iplotcorr <-
function(dat, group, rows, cols, reorder=TRUE, corr, corr_was_presubset=FALSE)
{
  indID <- rownames(dat)
  if(is.null(indID)) indID <- paste(1:nrow(dat))

  variables <- colnames(dat)
  if(is.null(variables)) variable <- paste0("var", 1:ncol(dat))

  if(missing(group) || is.null(group)) group <- rep(1, nrow(dat))

  if(nrow(dat) != length(group))
    stop("nrow(dat) != length(group)")
  if(!is.null(names(group)) && !all(names(group) == indID))
    stop("names(group) != rownames(dat)")

  if(!corr_was_presubset) {
    if(ncol(dat) != nrow(corr) || ncol(dat) != ncol(corr))
      stop("corr matrix should be ", ncol(dat), " x ", ncol(dat))

    if(reorder) {
      ord <- hclust(dist(corr), method="ward")$order
      variables <- variables[ord]
      dat <- dat[,ord]

      # fanciness to deal with the rows and cols args
      reconstructColumnSelection <- function(ord, cols)
        {
          cols.logical <- rep(FALSE, length(ord))
          cols.logical[cols] <- TRUE
          which(cols.logical[ord])
        }
      rows <- reconstructColumnSelection(ord, rows)
      cols <- reconstructColumnSelection(ord, cols)

      # reorder the rows and columns of corr to match
      corr <- corr[ord,ord]
    }
    corr <- corr[rows,cols]
  }

  # get rid of names
  dimnames(corr) <- dimnames(dat) <- NULL
  names(group) <- NULL

  output <- list("indID" = toJSON(indID),
                 "var" = toJSON(variables),
                 "corr" = toJSON(corr[rows,cols]),
                 "rows" = toJSON(rows-1),
                 "cols" = toJSON(cols-1),
                 "dat" =  toJSON(t(dat)), # columns as rows
                 "group" = toJSON(group))
  paste0("{", paste0("\"", names(output), "\" :", output, collapse=","), "}")
}
