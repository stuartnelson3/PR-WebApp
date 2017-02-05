/**
 * Created by Tom on 29.12.16.
 */

angular.module("InstitutionCRUDApp", ['ngRoute', 'isteven-multi-select'])
    .config(function($routeProvider) {
        $routeProvider
            .when("/", {
                templateUrl: "institutionlist.html",
                controller: "InstitutionController",
                resolve: {
                    institutionlist: function(Institutionlist) {
                        return Institutionlist.getAllInstitutions();
                    }
                }
            })
            .when("/new/institution", {
                controller: "NewInstitutionController",
                templateUrl: "institution-form.html"
            })
            .when("/institution/:institutionId", {
                controller: "EditInstitutionController",
                templateUrl: "institution.html"
            })
            // .when("/institution/filter", {
            //     controller: "FilterInstitutionController",
            //     templateUrl: "filter-institutionList.html"
            // })
           .otherwise({
            redirectTo: "/"
           })
    })



    // HTTP Req / Res zum Server mit REST
    .service("Institutionlist", function($http) {

        this.getAllInstitutions = function() {
            return $http.get('/institutionlist').
            then(function(response) {
                return response;
            }, function(response) {
                alert("Error finding Institutionlist.");
            });
        };


        this.createInstitution = function(institution) {
            return $http.post("/institutionlist", institution).
            then(function(response) {
                return response;
            }, function(response) {
                alert("Error creating institution.");
            });
        };


        this.getSingleInstitution = function(institutionId) {
            var url = "/institutionlist/" + institutionId;
            return $http.get(url).
            then(function(response) {
                return response;
            }, function(response) {
                alert("Error finding this Institution.");
            });
        };


        this.updateInstitution = function(institution) {
            console.log(institution);
            var url = "/institutionlist/" + institution.institutionIdPk;
            console.log(institution.institutionIdPk);
            return $http.put(url, institution).
            then(function(response) {
                return response;
            }, function(response) {
                alert("Error editing this Institution.");
                console.log(response);
            });
        };

        // filterInstitution
        this.filterInstitution = function(filter) {
            console.log(filter);
            var url = "/institutionlist/filter";
            return $http.put(url, filter).
            then(function(response) {
                return response;
            }, function(response) {
                alert("Error filtering Institutionlist.");
                console.log(response);
            });
        };


        this.deleteInstitution = function(institutionId) {
            var url = "/institutionlist/" + institutionId;
            return $http.delete(url).
            then(function(response) {
                return response;
            }, function(response) {
                alert("Error deleting this Institution.");
                console.log(response);
            });
        }
    })


    // Show/Filter Institutionlist
    .controller("InstitutionController", function(institutionlist, $scope, $http) {


        // Mutltiselect KV
        $scope.KvSelect = [
            {
                name: '<strong>Alle KV Region</strong>',
                msGroup: true
            },
            {
                name: '<strong>Nord-Ost</strong>',
                msGroup: true
            },
            {
                name: 'KV Berlin',
                ticked: false
            },
            {
                name: 'KV Brandenburg',
                ticked: false
            },
            {
                name: 'KV Mecklemburg-Vorpommern',
                ticked: false
            },
            {
                msGroup: false
            },
            {
                name: '<strong>Nord-West</strong>',
                msGroup: true
            },
            {
                name: 'KV Niedersachsen',
                ticked: false
            },
            {
                name: 'KV Schleswig-Holstein',
                ticked: false
            },
            {
                name: 'KV Bremen',
                ticked: false
            },
            {
                msGroup: false
            },
            {
                name: '<strong>Süd-Ost</strong>',
                msGroup: true
            },
            {
                name: 'KV Sachsen',
                ticked: false
            },
            {
                name: 'KV Bayern',
                ticked: false
            },
            {
                msGroup: false
            },
            {
                name: '<strong>Süd-West</strong>',
                msGroup: true
            },
            {
                name: 'KV Rheinland-Pfalz',
                ticked: false
            },
            {
                name: 'KV Baden-Württemberg',
                ticked: false
            },
            {
                msGroup: false
            },
            {
                msGroup: false
            }
        ];



        // Mutltiselect PLZ
        $scope.PLZ = [
            {
                name: '<strong>Alle PLZ</strong>',
                msGroup: true
            },
            {
                name: '<strong>0</strong>',
                msGroup: true
            },
            {
                name: '01...',
                ticked: false
            },
            {
                name: '02...',
                ticked: false
            },
            {
                name: '03...',
                ticked: false
            },
            {
                msGroup: false
            },
            {
                name: '<strong>1</strong>',
                msGroup: true
            },
            {
                name: '10...',
                ticked: false
            },
            {
                name: '11...',
                ticked: false
            },
            {
                name: '12',
                ticked: false
            },
            {
                msGroup: false
            },
            {
                name: '<strong>2</strong>',
                msGroup: true
            },
            {
                name: '20...',
                ticked: false
            },
            {
                name: '21...',
                ticked: false
            },
            {
                msGroup: false
            },
            {
                name: '<strong>3</strong>',
                msGroup: true
            },
            {
                name: '30...',
                ticked: false
            },
            {
                name: '31...',
                ticked: false
            },
            {
                msGroup: false
            },
            {
                msGroup: false
            }
        ];



        // Mutltiselect Fächergruppen
        $scope.Fachergruppen = [
            {       name: "Augenarzt",                  ticked: false  },
            {       name: "Chirurgie",                  ticked: false },
            {       name: "HNO-Artz",                   ticked: false },
            {       name: "Noch ein Arzt",              ticked: false },
            {       name: "Und noch ein Arzt",          ticked: false  }
        ];



        // Mutltiselect Träger
        $scope.Ausrichtung = [
            {       name: "Grundversorger",          ticked: false  },
            {       name: "Fachgleich",               ticked: false },
            {       name: "Spezial",                        ticked: false }
        ];

        // Mutltiselect Träger
        $scope.ArztAnzahl = [
            {       name: "0,5",          ticked: false  },
            {       name: "1",               ticked: false },
            {       name: "1,5",                        ticked: false }
        ];



        //Filter Button
        $scope.onFilterClick = function() {
            var parameters = {};

            $scope.institutionlist = institutionlist.data;

            console.log($scope.outputKv, $scope.outputPLZ, $scope.outputFachergruppen, $scope.outputTrager );

            console.log(institutionlist);


            //Get the data from Multiselect
          parameters['institutionKvRegion'] = parameters['institutionKvRegion'] || [];
            angular.forEach( $scope.outputKv, function( value, key ) {
              // Need to set multiple values
              if (value.ticked) {
                parameters['institutionKvRegion'].push(value.name);
              }
            });

            //Get the data from Multiselect
          parameters['institutionPLZ'] = parameters['institutionPLZ'] || [];
            angular.forEach( $scope.outputPLZ, function( value, key ) {
              if (value.ticked) {
                parameters['institutionPLZ'].push(value.name);
              }
            });

            //Get the data from Multiselect
            angular.forEach( $scope.outputFachergruppe, function( value, key ) {
                console.log(value.name)
            });

            //Get the data from Multiselect
            angular.forEach( $scope.outputAusrichtung, function( value, key ) {
                console.log(value.name)
            });

            angular.forEach( $scope.outputArztAnzahl, function( value, key ) {
                console.log(value.name)
            });

          $http.get('/institutionlist', {params: parameters}).
            then(function(response) {
              return response;
            }, function(response) {
              alert("Error finding Institutionlist.");
            });

        };



        //
        // $scope.mailcheck = [
        //     {value:'mailcheck1', selected:false},
        //     {value:'mailcheck2', selected:false},
        //     {value:'mailcheck2', selected:false}
        // ];
        //
        // $scope.toggleAll = function() {
        //     var toggleStatus = !$scope.isAllSelected;
        //     angular.forEach($scope.mailcheck, function(itm){ itm.selected = toggleStatus; });
        // };
        //
        // $scope.mailcheckToggled = function(){
        //     $scope.isAllSelected = $scope.mailcheck.every(function(itm){ return itm.selected; })
        // };



        //TODO: Edititng Single Institution on Homesite

        $scope.isEditing = false;


        $scope.onEditClick = function(institution) {
            

                $scope.isEditing = true;
                
                console.log(institution.institutionIdPk);

                institution.updatedInstitutionName = institution.InstitutionName;
                institution.updatedInstitutionEmail = institution.InstitutionEmail;
                institution.updatedInstitutionNumber = institution.InstitutionNumber;
        };




        $scope.onCancelClick = function() {
            $scope.isEditing = false;
        };


        $scope.onSaveClick = function(institution) {
            institution.InstitutionName = institution.updatedInstitutionName;
            institution.InstitutionEmail = institution.updatedInstitutionEmail;
            institution.InstitutionNumber = institution.updatedInstitutionNumber;
            $scope.isEditing = false;
            Institutionlist.updateInstitution(institution);
        };

        $scope.onEmailVerteilerClick = function(institution) {

           console.log(institution.InstitutionEmail)
        };
    })





    // Add a New Institution
    .controller("NewInstitutionController", function($scope, $location, Institutionlist) {
        $scope.back = function() {
            $location.path("#/");
        };

        $scope.saveInstitution = function(institution) {
            Institutionlist.createInstitution(institution).then(function(doc) {
                var institutionUrl = "/institution/" + doc.data._id;
                $location.path(institutionUrl);
            }, function(response) {
                alert(response);
            });
        }
    })
    


    //Edit an Institution
    .controller("EditInstitutionController", function($scope, $routeParams, Institutionlist) {
        Institutionlist.getSingleInstitution($routeParams.institutionId).then(function(doc) {
            $scope.institution = doc.data;
            console.log(doc.data);
        }, function(response) {
            alert(response);
        });


        $scope.toggleEdit = function() {
            $scope.editMode = true;
            $scope.institutionFormUrl = "institution-form.html";
        };

        $scope.back = function() {
            $scope.editMode = false;
            $scope.institutionFormUrl = "";
        };

        $scope.saveInstitution = function(institution) {
            Institutionlist.updateInstitution(institution);
            $scope.editMode = false;
            $scope.institutionFormUrl = "";
        };

        $scope.deleteInstitution = function(institutionId) {
            Institutionlist.deleteInstitution(institutionId);
        }

    });

    //
    // //Edit an Institution
    // .controller("FilterInstitutionController", function(institutionlist, $scope) {
    //
    //         console.log(doc.data);
    //     }, function(response) {
    //         alert(response);
    //     });


    //  TODO:Validation of Emails - 'ng-email-list'
    // .controller('prefill', ['$scope', function ($scope) {
    //         $scope.test4 = ['test@test.com', 'test2@test.com'];
    // }])
    //
    //
    // .controller('repeats', ['$scope', function ($scope) {
    //         $scope.repeat = [];
    // }]);




