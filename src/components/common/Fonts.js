'use strict';

import { Platform, Dimensions } from 'react-native';

const DEVICE_SCALE = Dimensions.get('window').width / 375;

const DEFAULT_FONT = "helvetica";

/* utils ==================================================================== */

// get font name and weight
function fontWithWeight(family = DEFAULT_FONT, weight = "regular") {
    return family;
}
  
function normalize(size){
    return Math.round(DEVICE_SCALE * size);
}
  
// attempt to normalize x-platform line heights
function lineHeight(val = 1, scale = 1, normalized = true) {
    let adjusted = normalized ? normalize(val) : val;
    return Math.round(Platform.OS === "android" ? adjusted * scale : adjusted);
}
  
/* export =================================================================== */

export default {
    default: DEFAULT_FONT,
    helvetica: DEFAULT_FONT,
    h1: DEFAULT_FONT,
    h2: DEFAULT_FONT,
    h3: DEFAULT_FONT,
    h4: DEFAULT_FONT,
    p: DEFAULT_FONT,
    button: DEFAULT_FONT,
  
    fontWithWeight,
    lineHeight,
    normalize
};
  