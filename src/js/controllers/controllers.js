"use strict";

//require('angular-elastic');
import 'angular-elastic'

angular.module('controllers', ['chatService', 'accountService', 'monospaced.elastic'])

    .controller('DashCtrl', function ($scope) {
    })

    .controller('ChatsCtrl', function ($scope, $ionicModal, Chats) {
        $scope.chats = Chats.all();
        $scope.remove = function (chat) {
            Chats.remove(chat);
        };
        var modal;
        $ionicModal.fromTemplateUrl('/templates/add-message.html', {
            scope: $scope,
            focusFirstInput: true
        }).then(function(createdModal) {
            modal = createdModal;
        });
        $scope.newMessage = function() {
            modal.show();
        };
        $scope.closeNewMessage = function() {
            modal.hide();
        };
        $scope.addMessage = function(message) {
            Chats.add(message);
            modal.hide();
            message.lastText = "";
        }
    })

    .controller('ChatDetailCtrl', function ($scope, $stateParams, Chats) {
        $scope.chat = Chats.get($stateParams.chatId);
    })

    .controller('AccountCtrl', function ($scope, accountService) {
        var username = "me";
        $scope.settings = accountService.getAccount(username);

        $scope.switchFriendsEnabled = function () {
            accountService.saveEnableFriends(username, $scope.settings.enableFriends);
        }
    });
