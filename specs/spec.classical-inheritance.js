/**
 * @author Camille Reynders
 * Date: 08/03/12
 * Time: 11:44
 */

var Base = function(){
    this.baseArr = [];
    this.something = 'something';
    Base.constructorCalled++;
};
Base.constructorCalled = 0;
Base.prototype = {
    getSomething : function(){
        return this.something;
    }
};

var Foo = function(){
    Foo.__super__.call( this ); //call super constructor

    this.bar = 'bar';
    this.fooArr = [];

    Foo.constructorCalled++;

};

demiurge.extend( Foo, Base ); //classical inheritance

Foo.constructorCalled = 0;

Foo.prototype.getBar = function(){
    return this.bar;
};

Foo.prototype.getSomething = function(){
    return 'foo_' + Foo.__super__.prototype.getSomething.call( this );
}


var Baz = function(){
    Baz.__super__.call( this );
    this.qux = 'qux';
    this.bazArr = [];
};

demiurge.extend( Baz, Foo );

Baz.prototype.getQux = function(){
    return this.qux
};


describe("Classical", function(){
    beforeEach( function(){
        this.addMatchers({
            toBeInstanceOf : function( expected ){
                return this.actual instanceof expected;
            }
        })
    } );
    afterEach( function(){
        Base.constructorCalled = 0;
        Foo.constructorCalled = 0;
    });

    describe("single inheritance", function(){
        var foo;
        beforeEach( function(){
            foo = new Foo();
        })
        it( "should call constructor", function(){
            expect( Foo.constructorCalled ).toEqual( 1 );
        });
        it( "should call super constructor", function(){
            expect( Base.constructorCalled ).toEqual( 1 );
        });
        it( "should have its instance members be initialized", function(){
            expect( foo.bar ).toEqual( 'bar' );
        } );
        it( "should have its inherited instance members be initialized", function(){
            expect( foo.something ).toEqual( 'something')
        } );
        it( "should allow for overridden methods", function(){
            expect( foo.getSomething() ).toEqual( 'foo_something' );
        });
        it( "should let the instance be of its own type", function(){
            expect( foo ).toBeInstanceOf( Foo );
        });
        it( "should let the instance be of the super type", function(){
            expect( foo ).toBeInstanceOf( Base );
        });
        it( "should not share its primitive instance members with others", function(){
            var f = new Foo();
            f.bar = 'notbar';
            expect( f.bar ).not.toEqual( foo.bar );
        });
        it( "should not share its complex instance members with others", function(){
            var f = new Foo();
            f.fooArr.push( 'a' );
            expect( f.fooArr ).not.toEqual( foo.fooArr );
            expect( f.fooArr.length ).not.toEqual( foo.fooArr.length );
        });
        it( "should not share its primitive instance members with instances of the super class", function(){
            var f = new Base();
            f.something = 'notsomething';
            expect( f.something ).not.toEqual( foo.something );
        });
        it( "should not share its complex instance members with instances of the super class", function(){
            var f = new Base();
            f.baseArr.push( 'whatever' );
            expect( f.baseArr ).not.toEqual( foo.baseArr );
            expect( f.baseArr.length ).not.toEqual( foo.baseArr.length );
        });
    });

});