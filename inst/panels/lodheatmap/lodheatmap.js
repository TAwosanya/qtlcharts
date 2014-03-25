// Generated by CoffeeScript 1.7.1
var lodheatmap;

lodheatmap = function() {
  var axispos, cellSelect, chart, chrGap, colors, dataByCell, height, margin, rectcolor, title, titlepos, width, xlab, xscale, ylab, yscale, zscale, zthresh;
  width = 1200;
  height = 600;
  margin = {
    left: 60,
    top: 40,
    right: 40,
    bottom: 40
  };
  axispos = {
    xtitle: 25,
    ytitle: 30,
    xlabel: 5,
    ylabel: 5
  };
  chrGap = 5;
  titlepos = 20;
  rectcolor = d3.rgb(230, 230, 230);
  colors = ["slateblue", "white", "crimson"];
  title = "";
  xlab = "Chromosome";
  ylab = "";
  zthresh = null;
  xscale = d3.scale.linear();
  yscale = d3.scale.linear();
  zscale = d3.scale.linear();
  cellSelect = null;
  dataByCell = false;
  chart = function(selection) {
    return selection.each(function(data) {
      var cells, celltip, chr, extent, g, gEnter, i, j, lod, lodcol, nlod, pos, svg, titlegrp, xLR, xaxis, yaxis, zlim, zmax, zmin, _i, _j, _k, _l, _len, _len1, _len2, _len3, _len4, _m, _ref, _ref1, _ref2, _ref3, _ref4;
      data = reorgLodData2(data);
      data = chrscales2(data, width, chrGap, margin.left);
      xscale = data.xscale;
      nlod = data.lodnames.length;
      yscale.domain([-0.5, nlod + 0.5]).range([height, 0]);
      xLR = {};
      _ref = data.chrnames;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        chr = _ref[_i];
        xLR[chr] = getLeftRight(data.posByChr[chr]);
      }
      zmin = 0;
      zmax = 0;
      _ref1 = data.lodnames;
      for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
        lodcol = _ref1[_j];
        extent = d3.extent(data[lodcol]);
        if (extent[0] < zmin) {
          zmin = extent[0];
        }
        if (extent[1] > zmin) {
          zmax = extent[1];
        }
      }
      console.log(zmin, zmax);
      if (-zmin > zmax) {
        zmax = -zmin;
      }
      zlim = zlim != null ? zlim : [-zmax, 0, zmax];
      if (zlim.length !== colors.length) {
        console.log("zlim.length (" + zlim.length + ") != colors.length (" + colors.length + ")");
      }
      zscale.domain(zlim).range(colors);
      zthresh = zthresh != null ? zthresh : zmin - 1;
      data.cells = [];
      _ref2 = data.chrnames;
      for (_k = 0, _len2 = _ref2.length; _k < _len2; _k++) {
        chr = _ref2[_k];
        _ref3 = data.posByChr[chr];
        for (i = _l = 0, _len3 = _ref3.length; _l < _len3; i = ++_l) {
          pos = _ref3[i];
          _ref4 = data.lodByChr[chr][i];
          for (j = _m = 0, _len4 = _ref4.length; _m < _len4; j = ++_m) {
            lod = _ref4[j];
            if (lod >= zthresh || lod <= -zthresh) {
              data.cells.push({
                z: lod,
                left: (xscale[chr](pos) + xscale[chr](xLR[chr][pos].left)) / 2,
                right: (xscale[chr](pos) + xscale[chr](xLR[chr][pos].right)) / 2,
                top: yscale(j + 0.5),
                height: yscale(j - 0.5) - yscale(j + 0.5),
                lodindex: j,
                chr: chr,
                pos: pos
              });
            }
          }
        }
      }
      svg = d3.select(this).selectAll("svg").data([data]);
      gEnter = svg.enter().append("svg").append("g");
      svg.attr("width", width + margin.left + margin.right).attr("height", height + margin.top + margin.bottom);
      g = svg.select("g");
      g.append("g").attr("id", "boxes").selectAll("empty").data(data.chrnames).enter().append("rect").attr("id", function(d) {
        return "box" + d;
      }).attr("x", function(d, i) {
        return data.chrStart[i];
      }).attr("y", function(d) {
        return margin.top;
      }).attr("height", height).attr("width", function(d, i) {
        return data.chrEnd[i] - data.chrStart[i];
      }).attr("fill", rectcolor).attr("stroke", "none");
      titlegrp = g.append("g").attr("class", "title").append("text").attr("x", margin.left + width / 2).attr("y", margin.top - titlepos).text(title);
      xaxis = g.append("g").attr("class", "x axis");
      xaxis.selectAll("empty").data(data.chrnames).enter().append("text").attr("x", function(d, i) {
        return (data.chrStart[i] + data.chrEnd[i]) / 2;
      }).attr("y", margin.top + height + axispos.xlabel).text(function(d) {
        return d;
      });
      xaxis.append("text").attr("class", "title").attr("x", margin.left + width / 2).attr("y", margin.top + height + axispos.xtitle).text(xlab);
      yaxis = g.append("g").attr("class", "y axis");
      yaxis.append("text").attr("class", "title").attr("y", margin.top + height / 2).attr("x", margin.left - axispos.ytitle).text(ylab).attr("transform", "rotate(270," + (margin.left - axispos.ytitle) + "," + (margin.top + height / 2) + ")");
      celltip = d3.tip().attr('class', 'd3-tip').html(function(d) {
        return "LOD = " + d3.format(".2f")(d.z);
      }).direction('e').offset([0, 10]);
      svg.call(celltip);
      cells = g.append("g").attr("id", "cells");
      cellSelect = cells.selectAll("empty").data(data.cells).enter().append("rect").attr("x", function(d) {
        return d.left;
      }).attr("y", function(d) {
        return d.top;
      }).attr("width", function(d) {
        return d.right - d.left;
      }).attr("height", function(d) {
        return d.height;
      }).attr("class", function(d, i) {
        return "cell" + i;
      }).attr("fill", function(d) {
        return zscale(d.z);
      }).attr("stroke", "none").attr("stroke-width", "1").on("mouseover.paneltip", function(d) {
        d3.select(this).attr("stroke", "black");
        return celltip.show(d);
      }).on("mouseout.paneltip", function() {
        d3.select(this).attr("stroke", "none");
        return celltip.hide();
      });
      return g.append("g").attr("id", "boxes").selectAll("empty").data(data.chrnames).enter().append("rect").attr("id", function(d) {
        return "box" + d;
      }).attr("x", function(d, i) {
        return data.chrStart[i];
      }).attr("y", function(d) {
        return margin.top;
      }).attr("height", height).attr("width", function(d, i) {
        return data.chrEnd[i] - data.chrStart[i];
      }).attr("fill", "none").attr("stroke", "black").attr("stroke-width", "none");
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
    var xlim;
    if (!arguments.length) {
      return xlim;
    }
    xlim = value;
    return chart;
  };
  chart.nxticks = function(value) {
    var nxticks;
    if (!arguments.length) {
      return nxticks;
    }
    nxticks = value;
    return chart;
  };
  chart.xticks = function(value) {
    var xticks;
    if (!arguments.length) {
      return xticks;
    }
    xticks = value;
    return chart;
  };
  chart.ylim = function(value) {
    var ylim;
    if (!arguments.length) {
      return ylim;
    }
    ylim = value;
    return chart;
  };
  chart.nyticks = function(value) {
    var nyticks;
    if (!arguments.length) {
      return nyticks;
    }
    nyticks = value;
    return chart;
  };
  chart.yticks = function(value) {
    var yticks;
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
  chart.colors = function(value) {
    if (!arguments.length) {
      return colors;
    }
    colors = value;
    return chart;
  };
  chart.dataByCell = function(value) {
    if (!arguments.length) {
      return dataByCell;
    }
    dataByCell = value;
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
  chart.zthresh = function(value) {
    if (!arguments.length) {
      return zthresh;
    }
    zthresh = value;
    return chart;
  };
  chart.zlim = function(value) {
    var zlim;
    if (!arguments.length) {
      return zlim;
    }
    zlim = value;
    return chart;
  };
  chart.xscale = function() {
    return xscale;
  };
  chart.yscale = function() {
    return yscale;
  };
  chart.zscale = function() {
    return zscale;
  };
  chart.cellSelect = function() {
    return cellSelect;
  };
  return chart;
};
