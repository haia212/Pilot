/* jshint ignore:start */
//Google Map settings

//Bing Map settings
var lf_bing_settings = {};
lf_bing_settings.credentials = 'Aj4X763gCLpxaoI6upHWGaz7RMf01JTPwkE1ucdX93yvj4zh_k24JUinSK1eW_e3';
lf_bing_settings.numberMarker = {
    anchor: {
        x: 17,
        y: 50
    },
    icon: lf_asset_base + '/images/marker/marker-pos.png',
    width: 33,
    height: 50
};
lf_bing_settings.clusterMarker = {
    icon: lf_asset_base + '/images/marker/cluster.png',
    width: 33,
    height: 50
};
lf_bing_settings.singleMarker = {
    icon: lf_asset_base + '/images/marker/marker.png',
    width: 33,
    height: 50
};

//Via Michelin settings
var lf_viamichelin_settings = {};
lf_viamichelin_settings.numberMarker = {
    icon: {
        url: lf_asset_base + '/images/marker/marker.png',
        offsetX: -17,
        offsetY: -50
    },
    size: {
        width: 33,
        height: 50
    },
    overlayText: {
        offsetX: 0,
        offsetY: 0,
        style: {
            color: '#333',
            fontSize: '14px',
            lineHeight: '33px',
            textAlign: 'center',
            width: '33px',
            height: '50px'
        }
    }
};
lf_viamichelin_settings.clusterMarker = {
    icon: {
        url: lf_asset_base + '/images/marker/cluster.png',
        offsetX: -17,
        offsetY: -50
    },
    size: {
        width: 33,
        height: 50
    },
    overlayText: {
        offsetX: 0,
        offsetY: 0,
        style: {
            color: '#333',
            fontSize: '14px',
            lineHeight: '33px',
            textAlign: 'center',
            width: '33px',
            height: '50px'
        }
    }
};
lf_viamichelin_settings.singleMarker = {
    icon: {
        url: lf_asset_base + '/images/marker/marker-pos.png',
        offsetX: -17,
        offsetY: -50
    },
    size: {
        width: 33,
        height: 50
    }
};
/* jshint ignore:end */
