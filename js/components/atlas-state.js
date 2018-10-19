define(['knockout', 'lscache', 'job/jobDetail', 'appConfig'], function (ko, cache, jobDetail, config) {
	var state = {};
	state.resultsUrl = ko.observable();
	state.vocabularyUrl = ko.observable();
	state.evidenceUrl = ko.observable();
	state.jobListing = ko.observableArray();
	state.errorNotifications = ko.observableArray();
	
	// Extending the jobListing array to include a 'queue' 
	// function that will check if an existing job is 
	// already present in the list and replace it.
	state.jobListing.queue = function(newItem) {
		var oldItem = state.jobListing().find(j => j.executionUniqueId() == newItem.executionUniqueId());
		if (oldItem != null) {
			state.jobListing.replace(oldItem, newItem);
		} else {
			state.jobListing.push(newItem);
		}
	}

	state.errorNotifications.queue = function(newItem) {
		state.errorNotifications.push(newItem);
	}


    var errorNotificationsCacheKey = "atlas:errorNotifications";
    var errorNotificationCache = cache.get(errorNotificationsCacheKey);
    if (errorNotificationCache) {
        errorNotificationCache.forEach(j => {
            state.errorNotifications.push(j);
        })
    }

	// job listing notification management
	var jobListingCacheKey = "atlas:jobListing";
	var jobListingCache = cache.get(jobListingCacheKey);
	if (jobListingCache) {
		jobListingCache.forEach(j => {
			state.jobListing.push(new jobDetail(j));
		})
	}

	state.jobListing.subscribe(function (data) {
		cache.set(jobListingCacheKey, ko.toJSON(data));
	});

	// shared concept selection state
	state.selectedConceptsIndex = {};
	state.selectedConcepts = ko.observableArray(null);
	state.appInitializationStatus = ko.observable('initializing');
	if(config.userAuthenticationEnabled) {
        state.permissionInitializationStatus = ko.observable('initializing');
    } else {
		state.permissionInitializationStatus = ko.observable('complete');
	}

	state.clearSelectedConcepts = function () {
		this.selectedConceptsIndex = {};
		this.selectedConcepts([]);
	}

	return state;
});