// Generated by CoffeeScript 1.7.1
var iheatmap;

iheatmap = function(data, chartOpts) {
  var axispos, cells, colors, formatX, formatY, g_heatmap, g_horslice, g_verslice, hbot, horcurvefunc, horslice, htop, margin, myheatmap, nxticks, nyticks, nzticks, plotHor, plotVer, rectcolor, removeHor, removeVer, shiftdown, shiftright, strokecolor, strokewidth, svg, title, titlepos, totalh, totalw, vercurvefunc, verslice, wleft, wright, xlab, xlim, xticks, ylab, ylim, yticks, zlab, zlim, zthresh, zticks, _ref, _ref1, _ref10, _ref11, _ref12, _ref13, _ref14, _ref15, _ref16, _ref17, _ref18, _ref19, _ref2, _ref20, _ref21, _ref22, _ref3, _ref4, _ref5, _ref6, _ref7, _ref8, _ref9;
  htop = (_ref = chartOpts != null ? chartOpts.htop : void 0) != null ? _ref : 500;
  hbot = (_ref1 = chartOpts != null ? chartOpts.hbot : void 0) != null ? _ref1 : 500;
  wleft = (_ref2 = chartOpts != null ? chartOpts.wleft : void 0) != null ? _ref2 : 500;
  wright = (_ref3 = chartOpts != null ? chartOpts.wright : void 0) != null ? _ref3 : 500;
  margin = (_ref4 = chartOpts != null ? chartOpts.margin : void 0) != null ? _ref4 : {
    left: 60,
    top: 40,
    right: 40,
    bottom: 40,
    inner: 5
  };
  axispos = (_ref5 = chartOpts != null ? chartOpts.axispos : void 0) != null ? _ref5 : {
    xtitle: 25,
    ytitle: 30,
    xlabel: 5,
    ylabel: 5
  };
  titlepos = (_ref6 = chartOpts != null ? chartOpts.titlepos : void 0) != null ? _ref6 : 20;
  rectcolor = (_ref7 = chartOpts != null ? chartOpts.rectcolor : void 0) != null ? _ref7 : d3.rgb(230, 230, 230);
  strokecolor = (_ref8 = chartOpts != null ? chartOpts.strokecolor : void 0) != null ? _ref8 : "slateblue";
  strokewidth = (_ref9 = chartOpts != null ? chartOpts.strokewidth : void 0) != null ? _ref9 : 2;
  xlim = typeof chartOpts === "function" ? chartOpts(xlim != null ? xlim : d3.range(data.x)) : void 0;
  ylim = typeof chartOpts === "function" ? chartOpts(xlim != null ? xlim : d3.range(data.y)) : void 0;
  nxticks = (_ref10 = chartOpts != null ? chartOpts.nxticks : void 0) != null ? _ref10 : 5;
  xticks = (_ref11 = chartOpts != null ? chartOpts.xticks : void 0) != null ? _ref11 : null;
  nyticks = (_ref12 = chartOpts != null ? chartOpts.nyticks : void 0) != null ? _ref12 : 5;
  yticks = (_ref13 = chartOpts != null ? chartOpts.yticks : void 0) != null ? _ref13 : null;
  nzticks = (_ref14 = chartOpts != null ? chartOpts.nzticks : void 0) != null ? _ref14 : 5;
  zticks = (_ref15 = chartOpts != null ? chartOpts.zticks : void 0) != null ? _ref15 : null;
  title = (_ref16 = chartOpts != null ? chartOpts.title : void 0) != null ? _ref16 : "";
  xlab = (_ref17 = chartOpts != null ? chartOpts.xlab : void 0) != null ? _ref17 : "X";
  ylab = (_ref18 = chartOpts != null ? chartOpts.ylab : void 0) != null ? _ref18 : "Y";
  zlab = (_ref19 = chartOpts != null ? chartOpts.zlab : void 0) != null ? _ref19 : "Z";
  zthresh = (_ref20 = chartOpts != null ? chartOpts.zthresh : void 0) != null ? _ref20 : null;
  zlim = (_ref21 = chartOpts != null ? chartOpts.zlim : void 0) != null ? _ref21 : [-matrixMaxAbs(data.z), 0, matrixMaxAbs(data.z)];
  colors = (_ref22 = chartOpts != null ? chartOpts.colors : void 0) != null ? _ref22 : ["slateblue", "white", "crimson"];
  totalh = htop + hbot + 2 * (margin.top + margin.bottom);
  totalw = wleft + wright + 2 * (margin.left + margin.right);
  svg = d3.select("div#chart").append("svg").attr("height", totalh).attr("width", totalw);
  myheatmap = heatmap().width(wleft).height(htop).margin(margin).axispos(axispos).titlepos(titlepos).rectcolor(rectcolor).xlim(xlim).ylim(ylim).nxticks(nxticks).xticks(xticks).nyticks(nyticks).yticks(yticks).xlab(xlab).ylab(ylab).zlim(zlim).zthresh(zthresh).colors(colors);
  horslice = curvechart().width(wleft).height(hbot).margin(margin).axispos(axispos).titlepos(titlepos).rectcolor(rectcolor).xlim(xlim).ylim([zlim[0], zlim[2]]).nxticks(nxticks).xticks(xticks).nyticks(nzticks).yticks(zticks).xlab(xlab).ylab(zlab).strokecolor("").commonX(true);
  verslice = curvechart().width(wright).height(htop).margin(margin).axispos(axispos).titlepos(titlepos).rectcolor(rectcolor).xlim(ylim).ylim([zlim[0], zlim[2]]).nxticks(nyticks).xticks(yticks).nyticks(nzticks).yticks(zticks).xlab(ylab).ylab(zlab).strokecolor("").commonX(true);
  g_heatmap = svg.append("g").attr("id", "heatmap").datum(data).call(myheatmap);
  formatX = formatAxis(data.x);
  formatY = formatAxis(data.y);
  cells = myheatmap.cellSelect().on("mouseover", function(d, i) {
    g_verslice.select("g.title text").text("X = " + (formatX(d.x)));
    g_horslice.select("g.title text").text("Y = " + (formatY(d.y)));
    plotVer(d.i);
    return plotHor(d.j);
  }).on("mouseout", function(d, i) {
    g_verslice.select("g.title text").text("");
    g_horslice.select("g.title text").text("");
    removeVer();
    return removeHor();
  });
  shiftdown = htop + margin.top + margin.bottom;
  g_horslice = svg.append("g").attr("id", "horslice").attr("transform", "translate(0," + shiftdown + ")").datum({
    x: data.x,
    data: pullVarAsArray(data.z, 0)
  }).call(horslice);
  shiftright = wleft + margin.left + margin.right;
  g_verslice = svg.append("g").attr("id", "verslice").attr("transform", "translate(" + shiftright + ",0)").datum({
    x: data.y,
    data: data.z[0]
  }).call(verslice);
  horcurvefunc = function(j) {
    return d3.svg.line().x(function(d) {
      return horslice.xscale()(d);
    }).y(function(d, i) {
      return horslice.yscale()(data.z[i][j]);
    });
  };
  vercurvefunc = function(i) {
    return d3.svg.line().x(function(d) {
      return verslice.xscale()(d);
    }).y(function(d, j) {
      return verslice.yscale()(data.z[i][j]);
    });
  };
  plotHor = function(j) {
    console.log(strokecolor);
    return g_horslice.append("g").attr("id", "horcurve").append("path").datum(data.x).attr("d", horcurvefunc(j)).attr("stroke", strokecolor).attr("fill", "none").attr("stroke-width", strokewidth).attr("style", "pointer-events", "none");
  };
  removeHor = function() {
    return g_horslice.selectAll("g#horcurve").remove();
  };
  plotVer = function(i) {
    return g_verslice.append("g").attr("id", "vercurve").append("path").datum(data.y).attr("d", vercurvefunc(i)).attr("stroke", strokecolor).attr("fill", "none").attr("stroke-width", strokewidth).attr("style", "pointer-events", "none");
  };
  return removeVer = function() {
    return g_verslice.selectAll("g#vercurve").remove();
  };
};
