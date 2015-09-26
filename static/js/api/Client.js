define(function(require) {
    var _ = require('lodash');
    var $ = require('jquery');
    var RequestError = require('api/RequestError');
    require('prototype');

    var Client = Class.create({

        learn: function (modelConfig, trainingData, cb) {
            modelConfig = modelConfig || {};
            trainingData = trainingData || [];
            cb = cb || function () { };
            this._post("/api/learn", _.extend(modelConfig, {
                trainData: trainingData
            }), {
                onError: function (res) {
                    cb(new RequestError(res), null);
                },
                onComplete: function (res) {
                    console.log("[/api/learn] Message received: ", res);

                    if (res.status == "ok") {
                        cb(null, res.data);
                    } else {
                        cb(new RequestError(res, true), null);
                    }
                }
            });
        },

        recognize: function (data, cb) {
            data = data || [];
            cb = cb || function () { };
            this._post("/api/recognize", _.extend(modelConfig, {
                data: data
            }), {
                onError: function (res) {
                    cb(new RequestError(res), null);
                },
                onComplete: function (res) {
                    console.log("[/api/recognize] Message received: ", res);

                    if (res.status == "ok") {
                        cb(null, res.data);
                    } else {
                        cb(new RequestError(res, true), null);
                    }
                }
            });
        },

        _get: function (url, data, callbacks) {
            $.ajax({
                type: "GET",
                contentType: "application/json",
                url: url,
                data: data
            })
                .done(function (msg) {
                    callbacks.onComplete(msg);
                })
                .fail(function (error) {
                    callbacks.onError(error);
                });
        },

        _post: function (url, data, callbacks) {
            $.ajax({
                type: "POST",
                contentType: "application/json",
                url: url,
                dataType: "json",
                data: JSON.stringify(data)
            })
                .done(function (msg) {
                    callbacks.onComplete(msg);
                })
                .fail(function (error) {
                    callbacks.onError(error);
                });
        },

        _postForm: function (url, data, callbacks) {
            $.ajax({
                type: "POST",
                contentType: "application/json",
                url: url,
                dataType: "json",
                data: data
            })
                .done(function (msg) {
                    callbacks.onComplete(msg);
                })
                .fail(function (error) {
                    callbacks.onError(error);
                });
        }
    });

    return new Client();
});

