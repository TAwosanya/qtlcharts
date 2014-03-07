// Generated by CoffeeScript 1.6.3
var curvechart, formatAxis, pullVarAsArray;

curvechart = function() {
  var axispos, chart, commonX, curvesSelect, height, margin, nxticks, nyticks, rectcolor, strokecolor, strokecolorhilit, strokewidth, strokewidthhilit, title, titlepos, width, xlab, xlim, xscale, xticks, ylab, ylim, yscale, yticks;
  width = 800;
  height = 500;
  margin = {
    left: 60,
    top: 40,
    right: 40,
    bottom: 40,
    inner: 5
  };
  axispos = {
    xtitle: 25,
    ytitle: 30,
    xlabel: 5,
    ylabel: 5
  };
  titlepos = 20;
  xlim = null;
  ylim = null;
  nxticks = 5;
  xticks = null;
  nyticks = 5;
  yticks = null;
  rectcolor = d3.rgb(230, 230, 230);
  strokecolor = d3.rgb(190, 190, 190);
  strokecolorhilit = "slateblue";
  strokewidth = 2;
  strokewidthhilit = 2;
  title = "";
  xlab = "X";
  ylab = "Y";
  yscale = d3.scale.linear();
  xscale = d3.scale.linear();
  curvesSelect = null;
  commonX = true;
  chart = function(selection) {
    return selection.each(function(data) {
      var curve, curves, g, gEnter, group, i, j, ngroup, svg, titlegrp, tmp, xaxis, xrange, xs, yaxis, yrange, ys;
      group = data.group;
      group = group != null ? group : (function() {
        var _results;
        _results = [];
        for (i in data.data) {
          _results.push(1);
        }
        return _results;
      })();
      ngroup = d3.max(group);
      group = (function() {
        var _i, _len, _results;
        _results = [];
        for (_i = 0, _len = group.length; _i < _len; _i++) {
          g = group[_i];
          _results.push(g - 1);
        }
        return _results;
      })();
      if (!Array.isArray(strokecolor)) {
        strokecolor = [strokecolor];
      }
      if (strokecolor.length === 1 && ngroup > 1) {
        strokecolor = (function() {
          var _results;
          _results = [];
          for (i in d3.range(ngroup)) {
            _results.push(strokecolor[0]);
          }
          return _results;
        })();
      }
      if (!Array.isArray(strokecolorhilit)) {
        strokecolorhilit = [strokecolorhilit];
      }
      if (strokecolorhilit.length === 1 && ngroup > 1) {
        strokecolorhilit = (function() {
          var _results;
          _results = [];
          for (i in d3.range(ngroup)) {
            _results.push(strokecolorhilit[0]);
          }
          return _results;
        })();
      }
      if (commonX) {
        data = (function() {
          var _results;
          _results = [];
          for (i in data.data) {
            _results.push({
              x: data.x,
              y: data.data[i]
            });
          }
          return _results;
        })();
      } else {
        data = data.data;
      }
      xlim = xlim != null ? xlim : d3.extent(pullVarAsArray(data, "x"));
      ylim = ylim != null ? ylim : d3.extent(pullVarAsArray(data, "y"));
      for (i in data) {
        tmp = data[i];
        data[i] = [];
        for (j in tmp.x) {
          if (!((tmp.x[j] == null) || (tmp.y[j] == null))) {
            data[i].push({
              x: tmp.x[j],
              y: tmp.y[j]
            });
          }
        }
      }
      svg = d3.select(this).selectAll("svg").data([data]);
      gEnter = svg.enter().append("svg").append("g");
      svg.attr("width", width + margin.left + margin.right).attr("height", height + margin.top + margin.bottom);
      g = svg.select("g");
      g.append("rect").attr("x", margin.left).attr("y", margin.top).attr("height", height).attr("width", width).attr("fill", rectcolor).attr("stroke", "none");
      xrange = [margin.left + margin.inner, margin.left + width - margin.inner];
      yrange = [margin.top + height - margin.inner, margin.top + margin.inner];
      xscale.domain(xlim).range(xrange);
      yscale.domain(ylim).range(yrange);
      xs = d3.scale.linear().domain(xlim).range(xrange);
      ys = d3.scale.linear().domain(ylim).range(yrange);
      yticks = yticks != null ? yticks : ys.ticks(nyticks);
      xticks = xticks != null ? xticks : xs.ticks(nxticks);
      titlegrp = g.append("g").attr("class", "title").append("text").attr("x", margin.left + width / 2).attr("y", margin.top - titlepos).text(title);
      xaxis = g.append("g").attr("class", "x axis");
      xaxis.selectAll("empty").data(xticks).enter().append("line").attr("x1", function(d) {
        return xscale(d);
      }).attr("x2", function(d) {
        return xscale(d);
      }).attr("y1", margin.top).attr("y2", margin.top + height).attr("fill", "none").attr("stroke", "white").attr("stroke-width", 1).style("pointer-events", "none");
      xaxis.selectAll("empty").data(xticks).enter().append("text").attr("x", function(d) {
        return xscale(d);
      }).attr("y", margin.top + height + axispos.xlabel).text(function(d) {
        return formatAxis(xticks)(d);
      });
      xaxis.append("text").attr("class", "title").attr("x", margin.left + width / 2).attr("y", margin.top + height + axispos.xtitle).text(xlab);
      yaxis = g.append("g").attr("class", "y axis");
      yaxis.selectAll("empty").data(yticks).enter().append("line").attr("y1", function(d) {
        return yscale(d);
      }).attr("y2", function(d) {
        return yscale(d);
      }).attr("x1", margin.left).attr("x2", margin.left + width).attr("fill", "none").attr("stroke", "white").attr("stroke-width", 1).style("pointer-events", "none");
      yaxis.selectAll("empty").data(yticks).enter().append("text").attr("y", function(d) {
        return yscale(d);
      }).attr("x", margin.left - axispos.ylabel).text(function(d) {
        return formatAxis(yticks)(d);
      });
      yaxis.append("text").attr("class", "title").attr("y", margin.top + height / 2).attr("x", margin.left - axispos.ytitle).text(ylab).attr("transform", "rotate(270," + (margin.left - axispos.ytitle) + "," + (margin.top + height / 2) + ")");
      curve = d3.svg.line().x(function(d) {
        return xscale(d.x);
      }).y(function(d) {
        return yscale(d.y);
      });
      g.selectAll("empty").append("g").data(d3.range(data.length)).enter().append("path").datum(function(d) {
        return data[d];
      }).attr("d", curve).attr("fill", "none").attr("stroke", function(d, i) {
        return strokecolor[group[i]];
      }).attr("stroke-width", strokewidth);
      curves = g.append("g").attr("id", "curves");
      curvesSelect = curves.selectAll("empty").data(d3.range(data.length)).enter().append("path").datum(function(d) {
        return data[d];
      }).attr("d", curve).attr("class", function(d, i) {
        return "path" + i;
      }).attr("fill", "none").attr("stroke", function(d, i) {
        return strokecolorhilit[group[i]];
      }).attr("stroke-width", strokewidthhilit).attr("opacity", 0).on("mouseover", function() {
        return d3.select(this).attr("opacity", 1);
      }).on("mouseout", function() {
        return d3.select(this).attr("opacity", 0);
      });
      return g.append("rect").attr("x", margin.left).attr("y", margin.top).attr("height", height).attr("width", width).attr("fill", "none").attr("stroke", "black").attr("stroke-width", "none");
    });
  };
  chart.width = function(value) {
    if (!arguments.length) {
      return width;
    }
    width = value;
    return chart;
  };
  chart.height = function(value) {
    if (!arguments.length) {
      return height;
    }
    height = value;
    return chart;
  };
  chart.margin = function(value) {
    if (!arguments.length) {
      return margin;
    }
    margin = value;
    return chart;
  };
  chart.axispos = function(value) {
    if (!arguments.length) {
      return axispos;
    }
    axispos = value;
    return chart;
  };
  chart.titlepos = function(value) {
    if (!arguments.length) {
      return titlepos;
    }
    titlepos;
    return chart;
  };
  chart.xlim = function(value) {
    if (!arguments.length) {
      return xlim;
    }
    xlim = value;
    return chart;
  };
  chart.nxticks = function(value) {
    if (!arguments.length) {
      return nxticks;
    }
    nxticks = value;
    return chart;
  };
  chart.xticks = function(value) {
    if (!arguments.length) {
      return xticks;
    }
    xticks = value;
    return chart;
  };
  chart.ylim = function(value) {
    if (!arguments.length) {
      return ylim;
    }
    ylim = value;
    return chart;
  };
  chart.nyticks = function(value) {
    if (!arguments.length) {
      return nyticks;
    }
    nyticks = value;
    return chart;
  };
  chart.yticks = function(value) {
    if (!arguments.length) {
      return yticks;
    }
    yticks = value;
    return chart;
  };
  chart.rectcolor = function(value) {
    if (!arguments.length) {
      return rectcolor;
    }
    rectcolor = value;
    return chart;
  };
  chart.strokecolor = function(value) {
    if (!arguments.length) {
      return strokecolor;
    }
    strokecolor = value;
    return chart;
  };
  chart.strokecolorhilit = function(value) {
    if (!arguments.length) {
      return strokecolorhilit;
    }
    strokecolorhilit = value;
    return chart;
  };
  chart.strokewidth = function(value) {
    if (!arguments.length) {
      return strokewidth;
    }
    strokewidth = value;
    return chart;
  };
  chart.strokewidthhilit = function(value) {
    if (!arguments.length) {
      return strokewidthhilit;
    }
    strokewidthhilit = value;
    return chart;
  };
  chart.commonX = function(value) {
    var dataByInd;
    if (!arguments.length) {
      return commonX;
    }
    dataByInd = value;
    return chart;
  };
  chart.title = function(value) {
    if (!arguments.length) {
      return title;
    }
    title = value;
    return chart;
  };
  chart.xlab = function(value) {
    if (!arguments.length) {
      return xlab;
    }
    xlab = value;
    return chart;
  };
  chart.ylab = function(value) {
    if (!arguments.length) {
      return ylab;
    }
    ylab = value;
    return chart;
  };
  chart.yscale = function() {
    return yscale;
  };
  chart.xscale = function() {
    return xscale;
  };
  chart.curvesSelect = function() {
    return curvesSelect;
  };
  return chart;
};

formatAxis = function(d) {
  var ndig;
  d = d[1] - d[0];
  ndig = Math.floor(Math.log(d % 10) / Math.log(10));
  if (ndig > 0) {
    ndig = 0;
  }
  ndig = Math.abs(ndig);
  return d3.format("." + ndig + "f");
};

pullVarAsArray = function(data, variable) {
  var i, v;
  v = [];
  for (i in data) {
    v = v.concat(data[i][variable]);
  }
  return v;
};
