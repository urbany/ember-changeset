import EmberObject from '@ember/object';
import isEmptyObject from 'ember-changeset/utils/computed/is-empty-object';
import { module, test } from 'qunit';


module('Unit | Utility | is empty object');

/* eslint-disable ember/avoid-leaking-state-in-ember-objects */
test('it returns true if the object has no keys', function(assert) {
  let Dummy = EmberObject.extend({
    _object: {},
    isEmpty: isEmptyObject('_object')
  });
  let result = Dummy.create().get('isEmpty');
  assert.ok(result, 'should be true');
});

test('it returns false if the object has at least 1 key', function(assert) {
  let Dummy = EmberObject.extend({
    _object: { foo: 'bar' },
    isEmpty: isEmptyObject('_object')
  });
  let result = Dummy.create().get('isEmpty');
  assert.notOk(result, 'should be false');
});

test('it throws if invoked without dependent key', function(assert) {
  try {
    EmberObject.extend({ isEmpty: isEmptyObject() });
  } catch({ message }) {
    assert.throws(
      ({message}) => message === "Assertion Failed: `dependentKey` must be defined",
      'should throw error'
    );
  }
});