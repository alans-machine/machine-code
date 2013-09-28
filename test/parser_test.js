var assert = require('assert');

var parser = require('../machine_code_parser.js');

describe('machine code parser', function(){
    it('should parse without newline', function(){
	var result = parser.parse('s0,I,s0,I,R;s0,_,s1,I,L;s1,I,s1,I,L;s1,_,s2,_,R;');

	assert(result);
    });

    it('should parse with newlines', function(){
	var result = parser.parse('s0,I,s0,I,R;\ns0,_,s1,I,L;\ns1,I,s1,I,L;\ns1,_,s2,_,R;');

	assert(result);
    });

    describe('parse result', function(){
	var result;

	beforeEach(function(){
	    result = parser.parse('s0,I,s0,I,R;s0,_,s1,I,L;s1,I,s1,I,L;s1,_,s2,_,R;');
	});

	it('should contain current states', function(){
	    assert(result.s0);
	    assert(result.s1);
	});

	describe('current state', function(){
	    var currentState;

	    beforeEach(function(){
		var result = parser.parse('s0,I,s0,I,R;s0,_,s1,I,L;s1,I,s1,I,L;s1,_,s2,_,R;');
		currentState = result.s0;
	    });

	    it('should contain reading symbols', function(){
		assert(currentState.I);
	    });

	    describe('read symbol', function(){
		var action;

		beforeEach(function(){
		    var result = parser.parse('s0,I,s0,I,R;s0,_,s1,I,L;s1,I,s1,I,L;s1,_,s2,_,R;');
		    var currentState = result.s0;
		    action = currentState.I;
		});


		it('should contain next state', function(){
		    assert(action.nextState);
		    assert.equal(action.nextState, 's0');
		});

		it('should contain write symbol', function(){
		    assert(action.write);
		    assert.equal(action.write, 'I');
		});

		it('should contain move direction', function(){
		    assert(action.move);
		    assert.equal(action.move, 'R');
		});
	    });
	});
    });
});
