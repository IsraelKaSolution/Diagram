/* global QUnit */
// https://api.qunitjs.com/config/autostart/
QUnit.config.autostart = false;

sap.ui.require([
	"student08saptraining/diagram/test/unit/AllTests"
], function (Controller) {
	"use strict";
	QUnit.start();
});