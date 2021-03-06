import Ember from 'ember';
import { DynamicComponentView } from 'ember-dynamic-component';

var isHTMLBars = !!Ember.HTMLBars;

function htmlbarsHelper(properties, hash, options, env) {
  Ember.assert("You can only pass attributes (such as name=value) not bare " +
  "values to {{dynamic-component}} '", properties.length === 0);

  hash["_dynamicOptions"] = hash;

  return env.helpers.view.helperFunction.call(this, [DynamicComponentView], hash, options, env);
}

function handlebarsHelper(options) {
  Ember.assert("You can only pass attributes (such as name=value) not bare " +
  "values to {{dynamic-component}} '", arguments.length < 2);

  // pass the options through to the resulting view
  // is there a valid type to use here?
  // this works but...
  options.hashTypes['_dynamicOptions'] = "OBJECT";
  options.hash['_dynamicOptions']      = options.hash;

  return Ember.Handlebars.helpers.view.call(this, DynamicComponentView, options);
}

function makeHelper() {
  if (isHTMLBars) {
    return {
      isHTMLBars: true,
      helperFunction: htmlbarsHelper,
      preprocessArguments: function() { }
    };
  } else {
    return handlebarsHelper;
  }
}

export default makeHelper();