export const TAU = 6.28318530717958647692

export const extend = function( base, sub, instanceProps, classProps ) {
  var constructor = function() {
    base.apply( this, arguments );
    sub.apply( this, arguments );
  };

  constructor.prototype = Object.create( base.prototype );
  constructor.prototype.constructor = sub;

  if ( !_.isUndefined( instanceProps ) ) _.extend( constructor.prototype, instanceProps );
  if ( !_.isUndefined( classProps ) ) _.extend( constructor, classProps );

  return constructor;
};

export const clamp = function( value, min, max ) {
  if ( min === undefined ) min = 0.0;
  if ( max === undefined ) max = 1.0;

  return Math.min( value, Math.max( value, min ), max );
}

export const mix = function( x, y, a ) {
  return x * (1.0 - a) + y * a;
}

export function hexToRGB( hexInt ) {
  var r = (hexInt >> 16) & 255;
  var g = (hexInt >> 8) & 255;
  var b = hexInt & 255;

  return [ r / 255.0, g / 255.0, b / 255 ];
}

// From http://en.wikipedia.org/wiki/B%C3%A9zier_curve
// B(t) = (1 - t)^2 * P0 + 2(1 - t)t * P1 + t^2 * P2, where t is between 0,1
export function quadraticCurve( start, end, control, t ) {
  var x = (1.0 - t) * (1.0 - t) * start[0] + 2 * (1.0 - t) * t * control[0] + t * t * end[0];
  var y = (1.0 - t) * (1.0 - t) * start[1] + 2 * (1.0 - t) * t * control[1] + t * t * end[1];
  return vec2.fromValues( x, y );
}
