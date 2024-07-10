export const apiService = (() => {
	const fetchModels = (makeUrlCode) => {
		return fetch(`${window.publisherBaseURL}/wp-json/dkwp/v2/car/${makeUrlCode}/models`)
			.then(response => {
				if (response.status !== 200) {
					return Promise.reject(response);
				}

				return response.json();
			});
	};

	const fetchVersions = (makeUrlCode, modelId) => {
		return fetch(`${window.publisherBaseURL}/wp-json/dkwp/v2/car/${makeUrlCode}/${modelId}/versions`)
			.then(response => {
				if (response.status !== 200) {
					return Promise.reject(response);
				}

				return response.json();
			});
	};

	const fetchWidgetData = (makeUrlCode, modelId, versionHistoricalId) => {
		let fetchUrl = `${window.widgetDataBaseURL}/wp-json/dkwp/v3/widget/vehicle-data?makeUrlCode=${makeUrlCode}&submodelCommercialUrlCode=${modelId}`;
		if (versionHistoricalId) {
			fetchUrl += `&versionHistoricalId=${versionHistoricalId}`;
		}
		return fetch(fetchUrl).then(response => {
			if (response.status !== 200) {
				return Promise.reject(response);
			}

			return response.json();
		});
	};

	const sendLeadData = (formDataObject) => {
		return fetch(`${window.widgetDataBaseURL}/wp-json/dkwp/v3/save-lead`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(formDataObject),
		}).then((response) => {
			if (response.status === 200 && response.ok) {
				// For 200 response status the submit is correct & complete
				Promise.resolve(null);
				return;
			}

			// Return the errors
			return response.json();
		});
	}

	return { fetchModels, fetchVersions, fetchWidgetData, sendLeadData };
})();
