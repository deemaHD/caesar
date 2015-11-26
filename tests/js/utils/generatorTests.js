QUnit.module('Generator');

QUnit.test('Generate login', function (assert) {
    var name = 'Dima',
        lastName = 'Selezen',
        result = '';
    
    result = Generator.generateLogin(name, lastName);
    
    //tests
    assert.ok(result.length, 6, 'Login length is 6');
    
    assert.ok(result, 'dselez', 'Login generated correctly');
});

QUnit.test('Generate short login', function (assert) {
    var name = 'Dima',
        lastName = 'Sel',
        result = '';
    
    result = Generator.generateLogin(name, lastName);
    
    //tests
    assert.ok(result.length, 6, 'Login length is 6');
    
    assert.ok(result.substr(3), 'ita', 'Added "ita" to short login');
});

QUnit.test('Login uniqualization', function (assert) {
    var login = 'dselea',
        result = '';
    
    result = Generator.uniqualization(login);
    
    //test
    assert.ok(result, 'dseleb', 'Unique logn got last new last char');
});