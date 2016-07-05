/**
 * Created by Sharon on 6/30/2016.
 */
app.controller("CongressCtrl", ["$scope", "dataService",
    function($scope, dataService) {
        //model for angular ui grid
        $scope.congressmen;

        $scope.encodeURL = function(input) {
            return encodeURIComponent(input);
        }

        $scope.congressmenGrid = {
            rowHeight: 30,
            enableHorizontalScrollbar: 0,
            enablePaginationControls: true,
            paginationPageSizes: [25, 50, 75, 100],
            paginationPageSize: 25,
            enableFiltering: true,
            enableSorting: true,
            enableCellEditOnFocus: false,
            columnDefs: [{
                field: 'lastnameFirstname()', //use the identity function to concat first/last name
                displayName: 'Name',
                cellTemplate: '<div class="ui-grid-cell-contents" ng-if="row.entity.extra.hasOwnProperty(\'contact_form\')"><a href="{{row.entity.extra.contact_form}}" target="_blank">{{row.entity.person.lastname}}, {{row.entity.person.firstname}}</a></div>' +
                '<div class="ui-grid-cell-contents" ng-if="!row.entity.extra.hasOwnProperty(\'contact_form\')">{{row.entity.person.lastname}}, {{row.entity.person.firstname}}</div>',
                sortable: true,
                enableFiltering: true,
                maxWidth: 150,
                enableColumnResizing: false,
                enableCellEdit: false
            }, {
                field: 'role_type_label',
                displayName: 'Congress',
                sortable: true,
                enableFiltering: true,
                maxWidth: 140,
                enableColumnResizing: false,
                enableCellEdit: false
            }, {
                //To do: convert to friendly name
                field: 'getFriendlyStateName()',
                displayName: 'State',
                sortable: true,
                enableFiltering: true,
                maxWidth: 120,
                enableColumnResizing: false,
                enableCellEdit: false
            },{
                field: 'district',
                displayName: 'District',
                sortable: true,
                enableFiltering: true,
                maxWidth: 70,
                enableColumnResizing: false,
                enableCellEdit: false
            }, {
                field: 'party',
                displayName: 'Party',
                sortable: true,
                enableFiltering: true,
                maxWidth: 110,
                enableColumnResizing: false,
                enableCellEdit: false
            }, {
                field: 'phone',
                displayName: 'Phone',
                sortable: true,
                enableFiltering: false,
                maxWidth: 120,
                enableColumnResizing: false,
                enableCellEdit: false
            }, {
                field: 'extra.fax',
                displayName: 'Fax',
                sortable: true,
                enableFiltering: false,
                maxWidth: 120,
                enableColumnResizing: false,
                enableCellEdit: false
            }, {
                field: 'interact',
                displayName: 'Interact',
                cellTemplate: '<div class="ui-grid-cell-contents"><a ng-if="row.entity.extra.hasOwnProperty(\'address\')" ng-href="{{\'https://maps.google.com/?q=\' + grid.appScope.encodeURL(row.entity.extra.address) }}" target="_blank"><i title="{{row.entity.extra.address}}" class="fa fa-map-marker red-marker" aria-hidden="true"></i>&nbsp;</a><span ng-if="!row.entity.extra.hasOwnProperty(\'address\')"><i title="No address provided" class="fa fa-map-marker" aria-hidden="true"></i>&nbsp;</span>' +
                            '<a ng-if="row.entity.person.twitterid !== null" ng-href="{{\'https://twitter.com/\' + row.entity.person.twitterid + \'?lang=en\'}}" target="_blank"><i title="{{row.entity.person.twitterid}}" class="fa fa-twitter blue-marker" aria-hidden="true"></i>&nbsp;</a><span ng-if="row.entity.person.twitterid === null"><i title="No twitter provided" class="fa fa-twitter not-clickable" aria-hidden="true"></i>&nbsp;</span>' +
                            '<a ng-if="row.entity.person.youtubeid !== null" ng-href="{{\'https://youtube.com/\' + row.entity.person.youtubeid}}" target="_blank"><i title="{{row.entity.person.youtubeid}}" class="fa fa-youtube red-marker" aria-hidden="true"></i>&nbsp;</a><span ng-if="row.entity.person.youtubeid === null"><i title="No youtube provided" class="fa fa-youtube not-clickable" aria-hidden="true"></i>&nbsp;</span>' +
                            '<a ng-href="{{row.entity.website}}"><i title="Visit website" class="fa fa-home green-marker" aria-hidden="true"></i></a></div>',
                sortable: false,
                enableFiltering: false,
                maxWidth: 90,
                enableColumnResizing: false,
                enableCellEdit: false
            }]
        };

        function initialize() {
            dataService.getData(
                'https://www.govtrack.us/api/v2/role?current=true&limit=600'
            ).then(function successCallBack(response) {
                $scope.congressmen = response.data;
                $scope.congressmenGrid.data = response.data.objects; //set the API's response to grid data

                //must define the identity function to concatenate first and last name
                angular.forEach($scope.congressmenGrid.data,
                    function(row) {
                        row.firstLastName = function() {
                            return this.person.firstname + ' ' + this.person.lastname;
                        }

                        row.lastnameFirstname = function() {
                            return this.person.lastname + ", " + this.person.firstname;
                        }
                        // extract full state name after "from" from description
                        row.getFriendlyStateName = function() {
                            //var stateIndex = this.description.indexOf("from") + 5;
                            //return this.description.slice(stateIndex);
                            var stateNames =  {
                                "AL": "Alabama",
                                "AK": "Alaska",
                                "AS": "American Samoa",
                                "AZ": "Arizona",
                                "AR": "Arkansas",
                                "CA": "California",
                                "CO": "Colorado",
                                "CT": "Connecticut",
                                "DE": "Delaware",
                                "DC": "District Of Columbia",
                                "FM": "Federated States Of Micronesia",
                                "FL": "Florida",
                                "GA": "Georgia",
                                "GU": "Guam",
                                "HI": "Hawaii",
                                "ID": "Idaho",
                                "IL": "Illinois",
                                "IN": "Indiana",
                                "IA": "Iowa",
                                "KS": "Kansas",
                                "KY": "Kentucky",
                                "LA": "Louisiana",
                                "ME": "Maine",
                                "MH": "Marshall Islands",
                                "MD": "Maryland",
                                "MA": "Massachusetts",
                                "MI": "Michigan",
                                "MN": "Minnesota",
                                "MS": "Mississippi",
                                "MO": "Missouri",
                                "MT": "Montana",
                                "NE": "Nebraska",
                                "NV": "Nevada",
                                "NH": "New Hampshire",
                                "NJ": "New Jersey",
                                "NM": "New Mexico",
                                "NY": "New York",
                                "NC": "North Carolina",
                                "ND": "North Dakota",
                                "MP": "Northern Mariana Islands",
                                "OH": "Ohio",
                                "OK": "Oklahoma",
                                "OR": "Oregon",
                                "PW": "Palau",
                                "PA": "Pennsylvania",
                                "PR": "Puerto Rico",
                                "RI": "Rhode Island",
                                "SC": "South Carolina",
                                "SD": "South Dakota",
                                "TN": "Tennessee",
                                "TX": "Texas",
                                "UT": "Utah",
                                "VT": "Vermont",
                                "VI": "Virgin Islands",
                                "VA": "Virginia",
                                "WA": "Washington",
                                "WV": "West Virginia",
                                "WI": "Wisconsin",
                                "WY": "Wyoming"
                            };
                            for (var prop in stateNames) {
                                if (prop === this.state) {
                                    return stateNames[prop];
                                }
                            }
                        }
                    });
            }).catch(function errorCallBack(response) {
                alert("Failed to get congressmen");
            });
        }

        //must call the initialize function when the page first loads
        initialize();
    }
]);