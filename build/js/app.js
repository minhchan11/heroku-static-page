(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
exports.trafficDistDefaults = [0.01269013,
                          0.009102499,
                          0.007545883,
                          0.005188721,
                          0.006004092,
                          0.014246746,
                          0.037655291,
                          0.062264654,
                          0.051546239,
                          0.046698491,
                          0.050656744,
                          0.053947876,
                          0.055875115,
                          0.056883209,
                          0.060055742,
                          0.070047736,
                          0.086710944,
                          0.10177306,
                          0.063584072,
                          0.040472025,
                          0.034897856,
                          0.029620186,
                          0.023868118,
                          0.018664571];

exports.changeIndividualNum = function(thisArray,index,newNumber){
    thisArray[index] = newNumber;
    return thisArray;
}

exports.renderChecking = function(dataArray){
  var myTemplate = '{#.}<li>{.}</li>{/.}';

  var dataTemplate = dust.compile(myTemplate, "checkingTemplate");

  // load the template into the Dust cache
  dust.loadSource(dataTemplate);

  dust.render("checkingTemplate", dataArray, function(err, out) {
    $("#currentArray").html(out);
  });
}

},{}],2:[function(require,module,exports){
var trafficDistDefaults = require('./../js/thd.js').trafficDistDefaults;
var changeIndividualNum = require('./../js/thd.js').changeIndividualNum;
var renderChecking = require('./../js/thd.js').renderChecking;


$(document).ready(function(){
  var template = '{#.}<tr>'+
                    '<td>{$idx} - {@math key="{$idx}" method="add" operand="1"/}</td>' +
                    '<td>'+
                      '<input id="traffic_' + '{$idx}" type="text" data-slider-id="trafficSlider_'+'{$idx}" data-slider-min="0" data-slider-max="10" data-slider-step="0.01" data-slider-value={@math key="{.}" method="multiply" operand="100"/} />' +
                    '</td>' +
                    '<td>' +
                    '<input type="hidden" id="trafficDefault_'+ '{$idx}" value={@math key="{.}" method="multiply" operand="100"/}>' +
                    '<input type="text" id="trafficValue_'+'{$idx}" class="form-control" disabled=true>' +
                    '</td>'+
                    '<td>' +
                      '<label class="radio-inline">' +
                         '<input type="radio" name="displayOptions'+'{$idx}" id="enable_'+'{$idx}">' +
                         'Enable' +
                       '</label>' +
                       '<label class="radio-inline">' +
                         '<input type="radio" name="displayOptions'+'{$idx}" id="disable_'+'{$idx}" checked>' +
                          'Disable' +
                        '</label>'+
                    '</td>'+
                '</tr>{/.}';

  var dataTemplate = dust.compile(template, "trafficDistTemplate");

  // load the template into the Dust cache
  dust.loadSource(dataTemplate);

  dust.render("trafficDistTemplate", trafficDistDefaults, function(err, out) {
    $("#trafficTable").find('tbody').append(out);
  });

  renderChecking(trafficDistDefaults);

  // loop to change the value of elements in the array through UI
  for (var i = 0; i < 24; i++) {
  var currentIndex;
  $("#enable_" + i).click(function() {
    $("#trafficValue_" + this.id.split("_").pop()).prop("disabled", false);
  });
  $("#disable_" + i).click(function() {
    $("#trafficValue_" + this.id.split("_").pop()).prop("disabled", true);
  });

  //instantiate slider
  var trafficSlider = $("#traffic_" + i).slider();

  //get value from hidden input field
  var trafficDefault = (parseFloat($("#trafficDefault_" + i).val())).toFixed(2);

  //Set visible input field to default value
  $("#trafficValue_" + i).attr("value", trafficDefault);

  //Create two way binding between input field and slider
  $("#trafficValue_" + i).on("change", function() {
    currentIndex = (this.id).split("_").pop();
    $("#traffic_" + currentIndex).slider('setValue', this.value, true, true);
    trafficDistDefaults = changeIndividualNum(trafficDistDefaults, currentIndex, this.value/100);
    renderChecking(trafficDistDefaults);
  });
  $("#traffic_" + i).on("slide", function(slideEvt) {
    currentIndex = ((slideEvt.currentTarget.id).split("_").pop());
    $("#trafficValue_" + currentIndex).attr("value", slideEvt.value);
    trafficDistDefaults = changeIndividualNum(trafficDistDefaults, currentIndex, this.value/100);
    renderChecking(trafficDistDefaults);
  });
}
})

exports.trafficDistDefaults = [0.01269013,
                          0.009102499,
                          0.007545883,
                          0.005188721,
                          0.006004092,
                          0.014246746,
                          0.037655291,
                          0.062264654,
                          0.051546239,
                          0.046698491,
                          0.050656744,
                          0.053947876,
                          0.055875115,
                          0.056883209,
                          0.060055742,
                          0.070047736,
                          0.086710944,
                          0.10177306,
                          0.063584072,
                          0.040472025,
                          0.034897856,
                          0.029620186,
                          0.023868118,
                          0.018664571];

exports.changeIndividualNum = function(thisArray,index,newNumber){
    thisArray[index] = newNumber;
    return thisArray;
}

exports.renderChecking = function(dataArray){
  var myTemplate = '{#.}<li>{.}</li>{/.}';

  var dataTemplate = dust.compile(myTemplate, "checkingTemplate");

  // load the template into the Dust cache
  dust.loadSource(dataTemplate);

  dust.render("checkingTemplate", dataArray, function(err, out) {
    $("#currentArray").html(out);
  });
}

},{"./../js/thd.js":1}]},{},[2]);
