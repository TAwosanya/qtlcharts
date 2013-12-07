# create test data in JSON format

library(broman)
dat <- rmvn(200, c(2, 5, 10),
            rbind(c(1, 0.5*2, 0.2*3), 
                  c(0.5*2, 4, 0.8*3*2),
                  c(0.2*3, 0.8*3*2, 9)))

dat[1:4,3] <- NA
dat[4:9,2] <- NA

library(RJSONIO)
cat(RJSONIO::toJSON(dat), file="data.json")