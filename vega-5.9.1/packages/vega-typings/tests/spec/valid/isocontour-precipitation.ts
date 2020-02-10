import { Spec } from 'vega';

export const spec: Spec = {
  "$schema": "https://vega.github.io/schema/vega/v5.json",
  "width": 600,
  "height": 300,
  "autosize": "fit-x",

  "signals": [
    {
      "name": "projection", "value": "naturalEarth1",
      "bind": {"input": "select", "options": [
        "azimuthalEqualArea", "equalEarth", "equirectangular",
        "naturalEarth1", "orthographic"
      ]}
    },
    {
      "name": "scale", "value": 110,
      "bind": {"input": "range", "min": 50, "max": 400, "step": 5}
    },
    {
      "name": "rotate0", "value": 0,
      "bind": {"input": "range", "min": -180, "max": 180, "step": 1}
    },
    {
      "name": "rotate1", "value": 0,
      "bind": {"input": "range", "min": -180, "max": 180, "step": 1}
    },
    {
      "name": "rotate2",
      "value": 0
    },
    {
      "name": "opacity", "value": 0.5,
      "bind": {"input": "range", "min": 0, "max": 1, "step": 0.01}
    },
    {
      "name": "levels", "value": 6,
      "bind": {"input": "range", "min": 2, "max": 12, "step": 1}
    },
    {
      "name": "step",
      "update": "3000 / levels"
    }
  ],

  "data": [
    {
      "name": "precipitation",
      "url": "data/annual-precip.json"
    },
    {
      "name": "contours",
      "source": "precipitation",
      "transform": [
        {
          "type": "isocontour",
          "thresholds": {"signal": "sequence(step, 3000, step)"}
        }
      ]
    },
    {
      "name": "world",
      "url": "data/world-110m.json",
      "format": {"type": "topojson", "feature": "countries"}
    }
  ],

  "projections": [
    {
      "name": "projection",
      "type": {"signal": "projection"},
      "scale": {"signal": "scale"},
      "rotate": {"signal": "[rotate0, rotate1, rotate2]"},
      "translate": {"signal": "[width/2, height/2]"}
    }
  ],

  "scales": [
    {
      "name": "color",
      "type": "quantize",
      "domain": [0, 3000],
      "range": {"scheme": "bluepurple", "count": {"signal": "levels"}}
    }
  ],

  "marks": [
    {
      "type": "shape",
      "clip": true,
      "from": {"data": "world"},
      "encode": {
        "update": {
          "strokeWidth": {"value": 1},
          "stroke": {"value": "#eee"},
          "fill": {"value": "#ddd"}
        }
      },
      "transform": [
        {
          "type": "geoshape",
          "projection": "projection"
        }
      ]
    },
    {
      "type": "shape",
      "clip": true,
      "from": { "data": "contours"},
      "encode": {
        "update": {
          "fill": {"scale": "color", "field": "contour.value"},
          "fillOpacity": {"signal": "opacity"}
        }
      },
      "transform": [
        {
          "type": "geoshape",
          "field": "datum.contour",
          "projection": "projection"
        }
      ]
    }
  ],

  "legends": [
    {
      "title": "Annual Precipitation (mm)",
      "fill": "color",
      "orient": "bottom",
      "offset": 5,
      "type": "gradient",
      "gradientLength": 300,
      "gradientThickness": 12,
      "titlePadding": 10,
      "titleOrient": "left",
      "titleAnchor": "end",
      "direction": "horizontal"
    }
  ],

  "config": {
    "legend": {"layout": {"anchor": "middle"}}
  }
};
