/*jshint forin:true, noarg:true, noempty:true, eqeqeq:true, bitwise:true, strict:true, undef:true, curly:true, browser:true, maxerr:50, laxbreak:true, laxcomma:true */

/**
 * copyright 2012, Camille Reynders, MIT license
 * @author Camille Reynders
 * Date: 31/03/12
 * Time: 09:41
 * version %VERSION%
 */

( function( context ){

    "use strict";

    var demiurge = {
        VERSION : '%VERSION%'
    };

    demiurge.createProxy = function( o ) {
        var F = function () {
        };
        F.prototype = o;
        return F;
    };
    if( typeof Object.create === 'undefined' ){
        demiurge.createObject = function( o ){
            var F = demiurge.createProxy( o );
            return new F();
        };
    }else{
        demiurge.createObject = Object.create;
    }
    demiurge.extend = function( TargetClass, SourceClass ) {
        TargetClass.prototype = demiurge.createObject( SourceClass.prototype );
        TargetClass.__super__ = SourceClass;
        TargetClass.prototype.constructor = TargetClass;
    };
    demiurge.copyMembers = function( target, source ) {
        var p = source.prototype;
        for ( var member in p ) {
            if ( p.hasOwnProperty( member ) ) {
                target.prototype[ member ] = p[ member ];
            }
        }
        return target;
    };
    demiurge.decorate = function( target, SourceClass ){
        var F = demiurge.createProxy( target );
        F = demiurge.copyMembers( F, SourceClass );
        var instance = new F();
        SourceClass.call( instance );
        return instance;
    };
    context.demiurge = demiurge;
}( this ) );
