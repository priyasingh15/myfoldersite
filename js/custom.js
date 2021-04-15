$(function () {
	fetchMissions(undefined, 'all');
});

function fetchMissions(element, filter)
{
	let url = 'https://api.spaceXdata.com/v3/launches?limit=100';
	
	//reset class, change url, add class
	switch (filter)
	{
		case 'year':
			url = url + '&launch_success=true&land_success=true&launch_year=' + $(element).html();
			
			$('#LaunchFilter span.selected').removeClass('selected');
			$('#LaunchAndLandFilter span.selected').removeClass('selected');
			
			$('#YearFilter span.selected').removeClass('selected');
			$(element).addClass('selected');
			break;
		case 'launched':
			url = url + '&launch_success=' + $(element).html().toLowerCase();
		
			$('#YearFilter span.selected').removeClass('selected');
			$('#LaunchAndLandFilter span.selected').removeClass('selected');
		
			$('#LaunchFilter span.selected').removeClass('selected');
			$(element).addClass('selected');
			break;
		case 'launchedAndLanded':
			var filter = $(element).html().toLowerCase();
			url = url + `&launch_success=${filter}&land_success=${filter}`;
		
			$('#YearFilter span.selected').removeClass('selected');
			$('#LaunchFilter span.selected').removeClass('selected');
		
			$('#LaunchAndLandFilter span.selected').removeClass('selected');
			$(element).addClass('selected');
			break;
	}
	
	$('#Missions').html();
	
	$.get(url, function(data){
		var htmlContent = '';
		for(let i=0; i<data.length; i++)
		{
			let missionIds = '<ul>';
			for(let m=0; m<data[i].mission_id.length;m++)
			{
				missionIds = '<li>' + data[i].mission_id[m] + '</li>';
			}
			missionIds = missionIds + '</ul>';
			
			htmlContent = htmlContent + `
				<div class="details_box">
                    <img src="${data[i].links.mission_patch}" data-small="${data[i].links.mission_patch_small}" alt="${data[i].mission_name}">
                    <h3 class="missionName">${data[i].mission_name} #${data[i].flight_number}</h3>
                    <h3>Mission Ids:</h3>
					${missionIds}
                    <h3>Launch Year: ${data[i].launch_year}</h3>
                    <h3>Successful Launch: ${data[i].launch_success}</h3>
                    <h3>Successful Landing: ${data[i].launch_landing}</h3>
                </div>
			`;
			//launch_landing is not present in the API response, hence undefined
		}
		$('#Missions').html(htmlContent);
	});
}