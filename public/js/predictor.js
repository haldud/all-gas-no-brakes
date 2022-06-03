var anyScalerMean;
var anyScalerStd;
var seriousScalerMean;
var seriousScalerStd;
var fatalScalerMean;
var fatalScalerStd;

fetch('./tfjs-any/any-scaler-mean.json')
  .then(response => response.json())
  .then(data => anyScalerMean = data)
  .then(() => console.log('any-scaler-mean', anyScalerMean))

fetch('./tfjs-any/any-scaler-std.json')
  .then(response => response.json())
  .then(data => anyScalerStd = data)
  .then(() => console.log('any-scaler-std', anyScalerStd))

fetch('./tfjs-serious/serious-scaler-mean.json')
  .then(response => response.json())
  .then(data => seriousScalerMean = data)
  .then(() => console.log('serious-scaler-mean', seriousScalerMean))

fetch('./tfjs-serious/serious-scaler-std.json')
  .then(response => response.json())
  .then(data => seriousScalerStd = data)
  .then(() => console.log('serious-scaler-std', seriousScalerStd))

  fetch('./tfjs-fatal/fatal-scaler-mean.json')
  .then(response => response.json())
  .then(data => fatalScalerMean = data)
  .then(() => console.log('fatal-scaler-mean', fatalScalerMean))

fetch('./tfjs-fatal/fatal-scaler-std.json')
  .then(response => response.json())
  .then(data => fatalScalerStd = data)
  .then(() => console.log('fatal-scaler-std', fatalScalerStd))

var anyInjuryModel = loadAnyInjuryModel().then((model) => {
  console.log('Any injury model loaded:', model);
  let modelInput = getModelInputBasedOnProvidedFields('anyInjury');
  console.log("model input:", modelInput);
  predictAnyInjury(modelInput);
})
.catch((error) => {
  console.log('Error:', error)
});

var seriousInjuryModel = loadSeriousInjuryModel().then((model) => {
  console.log('Serious injury model loaded:', model);
  let modelInput = getModelInputBasedOnProvidedFields('seriousInjury');
  console.log("model input:", modelInput);
  predictSeriousInjury(modelInput);
})
.catch((error) => {
  console.log('Error:', error)
});

var fatalInjuryModel = loadFatalInjuryModel().then((model) => {
  console.log('Fatal injury model loaded:', model);
  let modelInput = getModelInputBasedOnProvidedFields('fatalInjury');
  console.log("model input:", modelInput);
  predictFatalInjury(modelInput);
})
.catch((error) => {
  console.log('Error:', error)
});

function predictInjury() {
  console.log("predicting injury...");

  // Get the models to use with predictions.
  var anyInput = getModelInputBasedOnProvidedFields('anyInjury');
  console.log("any model input:", anyInput);

  var seriousInput = getModelInputBasedOnProvidedFields('seriousInjury');
  console.log("serious model input:", seriousInput);


  var fatalInput = getModelInputBasedOnProvidedFields('fatalInjury');
  console.log("fatal model input:", fatalInput);


  predictAnyInjury(anyInput);
  predictSeriousInjury(seriousInput);
  predictFatalInjury(fatalInput);
}

function predictAnyInjury(modelInput) {
  console.log("predicting any injury...");
  var anyInjuryResult = anyInjuryModel.predict(modelInput);
  console.log("any injury prediction:", anyInjuryResult);
  var data = anyInjuryResult.dataSync();
  console.log("any injury prediction data:", data);
  drawLikelihoodChart('any-injury-prediction', (data[0] * 100).toFixed(1), 'Likelihood of any injury');
}

function predictSeriousInjury(modelInput) {
  console.log("predicting serious injury...");
  var seriousInjuryResult = seriousInjuryModel.predict(modelInput);
  console.log("serious injury prediction:", seriousInjuryResult);
  var data = seriousInjuryResult.dataSync();
  console.log("serious injury prediction data:", data);
  drawLikelihoodChart('serious-injury-prediction', (data[0] * 100).toFixed(1), 'Likelihood of serious injury');
}

function predictFatalInjury(modelInput) {
  console.log("predicting fatal injury...");
  var fatalInjuryResult = fatalInjuryModel.predict(modelInput);
  console.log("fatal injury prediction:", fatalInjuryResult);
  var data = fatalInjuryResult.dataSync();
  console.log("fatal injury prediction data:", data);
  drawLikelihoodChart('fatal-injury-prediction', (data[0] * 100).toFixed(1), 'Likelihood of fatal injury');
}

function getModelInputBasedOnProvidedFields(modelType) {
  // Get all of the elements that represent input.
  var driverAge = document.getElementById("age_im");
  var vehicleYear = document.getElementById("mod_year");
  var tripHour = document.getElementById("hour");
  var speedLimit = document.getElementById("vspd_lim");
  var vehicleSpeed = document.getElementById("trav_speed");
  var vehicleOccupants = document.getElementById("numoccs");
  var vehicleDamage = document.getElementById("deformedname_Disabling_Damage");
  var restraintUsed = document.getElementById("rest_usename_No_seatbelt");
  var driverSex = document.getElementById("sex_imname");
  var urbanCity = document.getElementById("urban-city");
  var lightConditions = document.getElementById("light-conditions");
  var vehicleCountry = document.getElementById("make_country");
  var drivingLocation = document.getElementById("vtrafwayname");
  var seatPosition = document.getElementById("seat_name"); 
  // Log provided values.
  console.log("age:", driverAge.value);
  console.log("vehicle year:", vehicleYear.value);
  console.log("hour of day:", tripHour.value);
  console.log("speed limit:", speedLimit.value);
  console.log("vehicle speed:", vehicleSpeed.value);
  console.log("vehicle occupants:", vehicleOccupants.value);
  console.log("vehicle damage:", vehicleDamage.value);
  console.log("restraint used:", restraintUsed.value);
  console.log("driver sex:", driverSex.value);
  console.log("urban-city:",urbanCity.value);
  console.log("light conditions:", lightConditions.value);
  console.log("vehicle country:", vehicleCountry.value);
  console.log("driving location:", drivingLocation,value);
  console.log("seat location:", seatPosition.value);
  // Pass provided values to get model input.
  var modelInput = getModelInput(modelType, driverAge.value,vehicleYear.value,tripHour.value,speedLimit.value,vehicleSpeed.value,vehicleOccupants.value,vehicleDamage.value,restraintUsed.value,driverSex.value,urbanCity.value,lightConditions.value,vehicleCountry.value,drivingLocation.value,seatPosition.value);
  return modelInput;
}

function getModelInput(modelType, driverAge,vehicleYear,tripHour,speedLimit,vehicleSpeed,vehicleOccupants,vehicleDamage,restraintUsed,driverSex,urbanCity,lightConditions,vehicleCountry,drivingLocation,seatPosition) {
  var scaledInput;
  let input = [
    parseInt(urbanCity), //urbancity
    parseInt(tripHour), //hour
    1, //alcohol
    0, //wrk_zone
    parseInt(vehicleOccupants), //numoccs
    0, //tow_vehname
    parseInt(vehicleSpeed), //trav_speed
    0, //speedrelname
    parseInt(speedLimit), //vspd_lim
    parseInt(vehicleYear), //mod_year
    0, //rest_misname
    0, //helm_usename
    0, //helm_misname
    0, //drinkingname
    0, //drugsname
    parseInt(driverSex), //sex_imname
    parseInt(driverAge), //age_im
    0, //alc_resname_08
    1, //month_Apr
    0, //month_Aug
    0, //month_Dec
    0, //month_Feb
    0, //month_Jan
    0, //month_Jul
    0, //month_Jun
    0, //month_Mar
    0, //month_May
    0, //month_Nov
    0, //month_Oct
    0, //month_Sep
    1, //day_week_Fri
    0, //day_week_Mon
    0, //day_week_Sat
    0, //day_week_Sun
    0, //day_week_Thus
    0, //day_week_Tues
    0, //day_week_Wed
    (lightConditions == 'dark') ? 1 : 0, //lgt_cond_dark
    (lightConditions == 'dawn') ? 1 : 0, //lgt_cond_dawn
    (lightConditions == 'daylight') ? 1 : 0, //lgt_cond_daylight
    (lightConditions == 'dusk') ? 1 : 0, //lgt_cond_dusk
    (lightConditions == 'other') ? 1 : 0, //lgt_cond_other
    0, //weather_blowing_dirt
    1, //weather_clear
    0, //weather_cloudy
    0, //weather_fog_smoke
    0, //weather_freezing_rain
    0, //weather_other
    0, //weather_rain_sleet
    0, //weather_snow_blowsnow
    0, //weather_windy
    0, //m_harmname_harm_barrier
    0, //m_harmname_harm_fire
    0, //m_harmname_harm_fixed_manmade
    0, //m_harmname_harm_injury_fallout
    1, //m_harmname_harm_lost_control
    0, //m_harmname_harm_moving_veh
    0, //m_harmname_harm_nat_object
    0, //m_harmname_harm_object
    0, //m_harmname_harm_parked_veh
    0, //m_harmname_harm_ped_animal
    0, //m_harmname_harm_terrain
    0, //m_harmname_harm_train
    0, //m_harmname_harm_unknown
    0, //m_harmname_harm_water
    (vehicleDamage == '3') ? 1 : 0, //deformedname_Disabling Damage
    (vehicleDamage == '2') ? 1 : 0, //deformedname_Functional Damage
    (vehicleDamage == '1') ? 1 : 0, //deformedname_Minor Damage
    (vehicleDamage == '0') ? 1 : 0, //deformedname_No Damage
    (drivingLocation== 'on_ramp') ? 1 : 0, //vtrafwayname_Exit_on_ramp
    (drivingLocation== 'one_way') ? 1 : 0, //vtrafwayname_One-way
    (drivingLocation== 'park_drive') ? 1 : 0, //vtrafwayname_Parking_lot_driveway
    (drivingLocation== 'two-way') ? 1 : 0, //vtrafwayname_Two-way
    (drivingLocation== 'two_way') ? 1 : 0, //vtrafwayname_Two_way
    (drivingLocation== 'two_way_div_bar') ? 1 : 0, //vtrafwayname_Two_way_div_med_bar
    (drivingLocation== 'two_way_div_nobar') ? 1 : 0, //vtrafwayname_Two_way_div_med_nobar	
    0, //bdytyp_imname_2_door_sedan
    1, //bdytyp_imname_4_door_sedan
    0, //bdytyp_imname_ATV_rec_vehicle	
    0, //bdytyp_imname_Bus
    0, //bdytyp_imname_Construction_farm_equip
    0, //bdytyp_imname_Convertable
    0, //bdytyp_imname_Large_SUV
    0, //bdytyp_imname_Motorcylcle_trike
    0, //bdytyp_imname_Motorhome_RV
    0, //bdytyp_imname_Small_SUV_light_truck
    0, //bdytyp_imname_Truck
    0, //bdytyp_imname_Van
    0, //p_crash1name_Changing Lanes
    0, //p_crash1name_Diasbled_parked
    1, //p_crash1name_Going straight
    0, //p_crash1name_Making a U-turn	
    0, //p_crash1name_Merging
    0, //p_crash1name_Negotiating a Curve
    0, //p_crash1name_Passing or Overtaking Another Vehicle
    0, //p_crash1name_Start on road
    0, //p_crash1name_Stopping_backup
    0, //p_crash1name_Successful Avoidance Maneuver to a Previous Critical Event
    0, //p_crash1name_Turning Left
    0, //p_crash1name_Turning Right
    (restraintUsed == 'Child_restraint') ? 1 : 0 , //rest_usename_Child_restraint
    (restraintUsed == 'Harness') ? 1 : 0 , //rest_usename_Harness
    (restraintUsed == 'No_seatbelt') ? 1 : 0 , //rest_usename_No_seatbelt
    (restraintUsed == 'Seatbelt') ? 1 : 0 , //rest_usename_Seatbelt
    (seatPosition == 'cargo') ? 1 : 0 , //seat_imname_Cargo_area
    (seatPosition == 'driver') ? 1 : 0 , //seat_imname_Driver
    (seatPosition == 'front_pass') ? 1 : 0 , //seat_imname_Front_passenger
    (seatPosition == 'outside') ? 1 : 0 , //seat_imname_Riding_outside
    (seatPosition == 'second') ? 1 : 0 , //seat_imname_Second_row
    (seatPosition == 'third_fourth') ? 1 : 0 , //seat_imname_Third_or_4 Row
    (seatPosition == 'trailer') ? 1 : 0 , //seat_imname_Trailer
    (vehicleCountry == 'China') ? 1 : 0 , //make_country_make_China
    (vehicleCountry == 'England') ? 1 : 0 , //make_country_make_England
    (vehicleCountry == 'Germany') ? 1 : 0 , //make_country_make_Germany
    (vehicleCountry == 'Italy') ? 1 : 0 , //make_country_make_Italy
    (vehicleCountry == 'Japan') ? 1 : 0 , //make_country_make_Japan
    (vehicleCountry == 'Korea') ? 1 : 0 , //make_country_make_Korea
    (vehicleCountry == 'Sweden') ? 1 : 0 , //make_country_make_Sweden
    (vehicleCountry == 'USA') ? 1 : 0 , //make_country_make_US
    (vehicleCountry == 'Truck') ? 1 : 0 , //make_country_make_US_truck
    (vehicleCountry == 'Motorcycle') ? 1 : 0 , //make_country_make_motorcycle
    (vehicleCountry == 'Other') ? 1 : 0 , //make_country_make_other
  ];

  console.log('input prior to scaling:', input);

  // Apply standard scaling.
  if (modelType == 'anyInjury') {
    scaledInput = input.map((currElement, index) => {
      return (currElement - anyScalerMean[index]) / anyScalerStd[index];
    });
  }
  else if (modelType == 'seriousInjury') {
    scaledInput = input.map((currElement, index) => {
      return (currElement - seriousScalerMean[index]) / seriousScalerStd[index];
    });
  }
  else if (modelType == 'fatalInjury') {
    scaledInput = input.map((currElement, index) => {
      return (currElement - fatalScalerMean[index]) / fatalScalerStd[index];
    });
  }
  else  {
    console.error('uknown model type', modelType);
    scaledInput = input;
  }

  console.log('scaled input:', scaledInput);

  let vectorInput = [scaledInput];

  console.log('vector input:', vectorInput);

  return tf.tensor(vectorInput);
}

function drawLikelihoodChart(id, percent, label) {
  new Chart(id, {
    type: 'doughnut',
    data: {
      datasets: [{
        label: label,
        percent: percent,
        backgroundColor: ['#5283ff']
      }]
    },
    plugins: [{
        beforeInit: (chart) => {
          const dataset = chart.data.datasets[0];
          chart.data.labels = [dataset.label];
          dataset.data = [dataset.percent, 100 - dataset.percent];
        }
      },
      {
        beforeDraw: (chart) => {
          var width = chart.chart.width,
            height = chart.chart.height,
            ctx = chart.chart.ctx;
          ctx.restore();
          var fontSize = (height / 100).toFixed(2);
          ctx.font = fontSize + "em sans-serif";
          ctx.fillStyle = "#9b9b9b";
          ctx.textBaseline = "middle";
          var text = chart.data.datasets[0].percent + "%",
            textX = Math.round((width - ctx.measureText(text).width) / 2),
            textY = height / 2;
          ctx.fillText(text, textX, textY);
          ctx.save();
        }
      }
    ],
    options: {
      maintainAspectRatio: false,
      cutoutPercentage: 75,
      rotation: Math.PI / 2,
      legend: {
        display: false,
      },
      tooltips: {
        filter: tooltipItem => tooltipItem.index == 0
      }
    }
  });
}

async function loadAnyInjuryModel() {
    anyInjuryModel = await tf.loadLayersModel('./tfjs-any/model.json');
    return anyInjuryModel;
}

async function loadSeriousInjuryModel() {
    seriousInjuryModel = await tf.loadLayersModel('./tfjs-serious/model.json');
    return seriousInjuryModel;
}

async function loadFatalInjuryModel() {
    fatalInjuryModel = await tf.loadLayersModel('./tfjs-fatal/model.json');
    return fatalInjuryModel;
}
