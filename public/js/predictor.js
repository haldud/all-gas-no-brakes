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

  resetPredictions();

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

function resetPredictions() {
  var anyInjuryPredictionImage = document.getElementById("any-injury-prediction-image");
  var anyInjuryPredictionText = document.getElementById("any-injury-prediction-text");
  var seriousInjuryPredictionImage = document.getElementById("serious-injury-prediction-image");
  var seriousInjuryPredictionText = document.getElementById("serious-injury-prediction-text");
  var fatalInjuryPredictionImage = document.getElementById("fatal-injury-prediction-image");
  var fatalInjuryPredictionText = document.getElementById("fatal-injury-prediction-text");
  let spinnerClassName = 'fas fa-spinner fa-6x text-primary text-center';
  let runningPrediction = 'Running prediction';
  anyInjuryPredictionImage.className = spinnerClassName;
  seriousInjuryPredictionImage.className = spinnerClassName;
  fatalInjuryPredictionImage.className = spinnerClassName;
  anyInjuryPredictionText.innerHTML = runningPrediction;
  seriousInjuryPredictionText.innerHTML = runningPrediction;
  fatalInjuryPredictionText.innerHTML = runningPrediction;
}

function predictAnyInjury(modelInput) {
  console.log("predicting any injury...");
  var anyInjuryResult = anyInjuryModel.predict(modelInput);
  console.log("any injury prediction:", anyInjuryResult);
  var data = anyInjuryResult.dataSync();
  console.log("any injury prediction data:", data);
  var anyInjuryPredictionImage = document.getElementById("any-injury-prediction-image");
  var anyInjuryPredictionText = document.getElementById("any-injury-prediction-text");
  if (data[0] >= .5) {
    anyInjuryPredictionImage.className  = 'fas fa-check fa-6x text-danger';
    anyInjuryPredictionText.innerHTML = "Likely injury.";
  }
  else {
    anyInjuryPredictionImage.className  = 'fas fa-times fa-6x text-success';
    anyInjuryPredictionText.innerHTML = "Unlikely injury.";
  }
}

function predictSeriousInjury(modelInput) {
  console.log("predicting serious injury...");
  var seriousInjuryResult = seriousInjuryModel.predict(modelInput);
  console.log("serious injury prediction:", seriousInjuryResult);
  var data = seriousInjuryResult.dataSync();
  console.log("serious injury prediction data:", data);
  var seriousInjuryPredictionImage = document.getElementById("serious-injury-prediction-image");
  var seriousInjuryPredictionText = document.getElementById("serious-injury-prediction-text");
  if (data[0] >= .5) {
    seriousInjuryPredictionImage.className  = 'fas fa-check fa-6x text-danger';
    seriousInjuryPredictionText.innerHTML = "Likely serious injury.";
  }
  else {
    seriousInjuryPredictionImage.className  = 'fas fa-times fa-6x text-success';
    seriousInjuryPredictionText.innerHTML = "Unlikely serious injury.";
  }
}

function predictFatalInjury(modelInput) {
  console.log("predicting fatal injury...");
  var fatalInjuryResult = fatalInjuryModel.predict(modelInput);
  console.log("fatal injury prediction:", fatalInjuryResult);
  var data = fatalInjuryResult.dataSync();
  console.log("fatal injury prediction data:", data);
  var fatalInjuryPredictionImage = document.getElementById("fatal-injury-prediction-image");
  var fatalInjuryPredictionText = document.getElementById("fatal-injury-prediction-text");
  if (data[0] >= .5) {
    fatalInjuryPredictionImage.className  = 'fas fa-check fa-6x text-danger';
    fatalInjuryPredictionText.innerHTML = "Likely fatal injury.";
  }
  else {
    fatalInjuryPredictionImage.className  = 'fas fa-times fa-6x text-success';
    fatalInjuryPredictionText.innerHTML = "Unlikely fatal injury.";
  }
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
  var weatherConditions = document.getElementById("weather");
  var bodyType = document.getElementById("bdytyp");
  var vehicleCountry = document.getElementById("make_country");
  var towingTrailer = document.getElementById("towing");
  var drivingLocation = document.getElementById("vtrafwayname");
  var workZone = document.getElementById("workzone");
  var speedRelated = document.getElementById("speedrel");
  var priorCrash = document.getElementById("p_crash");
  var mostHarmful = document.getElementById("most_harm"); 
  var accidentMonth = document.getElementById("month"); 
  var accidentDay = document.getElementById("day_week"); 
  var seatPosition = document.getElementById("seat_name"); 
  var restraintMisuse = document.getElementById("restraint_misuse"); 
  var helmetUse = document.getElementById("helmet_use"); 
  var helmetMisuse = document.getElementById("helmet_misuse");
  var driverAlcohol = document.getElementById("driv_alcohol");
  var drinkingNamed = document.getElementById("drinking_name");
  var alcohol08 = document.getElementById("alc_08");
  var drugsInvolved = document.getElementById("drugs");


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
  console.log("weather conditions:", weatherConditions.value);
  console.log("body type:", bodyType.value);
  console.log("vehicle country:", vehicleCountry.value);
  console.log("towing trailer:", towingTrailer.value);
  console.log("driving location:", drivingLocation.value);
  console.log("work zone:", workZone.value);
  console.log("speed related:", speedRelated.value);
  console.log("prior crash:", priorCrash.value);
  console.log("most harmful:", mostHarmful.value);
  console.log("accident month:", accidentMonth.value);
  console.log("accident day:", accidentDay.value);
  console.log("seat location:", seatPosition.value);
  console.log("restraint misuse:", restraintMisuse.value);
  console.log("helmet use:", helmetUse.value);
  console.log("helmet misuse:", helmetMisuse.value);
  console.log("driver alcohol:", driverAlcohol.value);
  console.log("drinking named:", drinkingNamed.value);
  console.log("alcohol 08:", alcohol08.value);
  console.log("drugs involved:", drugsInvolved.value);
 
  // Pass provided values to get model input.
  var modelInput = getModelInput(modelType, driverAge.value,vehicleYear.value,tripHour.value,speedLimit.value,vehicleSpeed.value,vehicleOccupants.value,vehicleDamage.value,restraintUsed.value,driverSex.value,urbanCity.value,lightConditions.value,vehicleCountry.value,drivingLocation.value,seatPosition.value,weatherConditions.value,bodyType.value,towingTrailer.value,workZone.value,speedRelated.value,priorCrash.value,mostHarmful.value,accidentDay.value,accidentMonth.value,restraintMisuse.value,helmetUse.value,helmetMisuse.value,driverAlcohol.value,drinkingNamed.value,alcohol08.value,drugsInvolved.value);
  return modelInput;
}

function getModelInput(modelType, driverAge,vehicleYear,tripHour,speedLimit,vehicleSpeed,vehicleOccupants,vehicleDamage,restraintUsed,driverSex,urbanCity,lightConditions,vehicleCountry,drivingLocation,seatPosition,weatherConditions,bodyType,towingTrailer,workZone,speedRelated,priorCrash,mostHarmful,accidentDay,accidentMonth,restraintMisuse,helmetUse,helmetMisuse,driverAlcohol,drinkingNamed,alcohol08,drugsInvolved) {
  var scaledInput;
  let input = [
    parseInt(urbanCity), //urbancity
    parseInt(tripHour), //hour
    parseInt(driverAlcohol), //alcohol
    parseInt(workZone), //wrk_zone
    parseInt(vehicleOccupants), //numoccs
    parseInt(towingTrailer), //tow_vehname
    parseInt(vehicleSpeed), //trav_speed
    parseInt(speedRelated), //speedrelname
    parseInt(speedLimit), //vspd_lim
    parseInt(vehicleYear), //mod_year
    parseInt(restraintMisuse), //rest_misname
    parseInt(helmetUse), //helm_usename
    parseInt(helmetMisuse), //helm_misname
    parseInt(drinkingNamed), //drinkingname
    parseInt(drugsInvolved), //drugsname
    parseInt(driverSex), //sex_imname
    parseInt(driverAge), //age_im
    parseInt(alcohol08), //alc_resname_08
    (accidentMonth == 'Apr') ? 1 : 0, //month_Apr
    (accidentMonth == 'Aug') ? 1 : 0, //month_Aug
    (accidentMonth == 'Dec') ? 1 : 0, //month_Dec
    (accidentMonth == 'Feb') ? 1 : 0, //month_Feb
    (accidentMonth == 'Jan') ? 1 : 0, //month_Jan
    (accidentMonth == 'Jul') ? 1 : 0, //month_Jul
    (accidentMonth == 'Jun') ? 1 : 0, //month_Jun
    (accidentMonth == 'Mar') ? 1 : 0, //month_Mar
    (accidentMonth == 'May') ? 1 : 0, //month_May
    (accidentMonth == 'Nov') ? 1 : 0, //month_Nov
    (accidentMonth == 'Oct') ? 1 : 0, //month_Oct
    (accidentMonth == 'Sep') ? 1 : 0, //month_Sep
    (accidentDay == 'Fri') ? 1 : 0, //day_week_Fri
    (accidentDay == 'Mon') ? 1 : 0, //day_week_Mon
    (accidentDay == 'Sat') ? 1 : 0,//day_week_Sat
    (accidentDay == 'Sun') ? 1 : 0,//day_week_Sun
    (accidentDay == 'Thurs') ? 1 : 0,//day_week_Thus
    (accidentDay == 'Tues') ? 1 : 0,//day_week_Tues
    (accidentDay == 'Wed') ? 1 : 0,//day_week_Wed
    (lightConditions == 'dark') ? 1 : 0, //lgt_cond_dark
    (lightConditions == 'dawn') ? 1 : 0, //lgt_cond_dawn
    (lightConditions == 'daylight') ? 1 : 0, //lgt_cond_daylight
    (lightConditions == 'dusk') ? 1 : 0, //lgt_cond_dusk
    (lightConditions == 'other') ? 1 : 0, //lgt_cond_other
    (weatherConditions == 'blowing_dirt') ? 1 : 0, //weather_blowing_dirt
    (weatherConditions == 'clear') ? 1 : 0,//weather_clear
    (weatherConditions == 'cloudy') ? 1 : 0,//weather_cloudy
    (weatherConditions == 'fog_smoke') ? 1 : 0,//weather_fog_smoke
    (weatherConditions == 'freezing_rain') ? 1 : 0,//weather_freezing_rain
    (weatherConditions == 'other') ? 1 : 0,//weather_other
    (weatherConditions == 'rain_sleet') ? 1 : 0,//weather_rain_sleet
    (weatherConditions == 'snow_blowsnow') ? 1 : 0,//weather_snow_blowsnow
    (weatherConditions == 'windy') ? 1 : 0,//weather_windy
    (mostHarmful == 'barrier') ? 1 : 0, //m_harmname_harm_barrier
    (mostHarmful == 'fire') ? 1 : 0, //m_harmname_harm_fire
    (mostHarmful == 'fixed_obj') ? 1 : 0, //m_harmname_harm_fixed_manmade
    (mostHarmful == 'fallout_inj') ? 1 : 0, //m_harmname_harm_injury_fallout
    (mostHarmful == 'lost_control') ? 1 : 0, //m_harmname_harm_lost_control
    (mostHarmful == 'moving_veh') ? 1 : 0, //m_harmname_harm_moving_veh
    (mostHarmful == 'nat_obj') ? 1 : 0, //m_harmname_harm_nat_object
    (mostHarmful == 'object') ? 1 : 0, //m_harmname_harm_object
    (mostHarmful == 'parked_veh') ? 1 : 0, //m_harmname_harm_parked_veh
    (mostHarmful == 'animal_ped') ? 1 : 0, //m_harmname_harm_ped_animal
    (mostHarmful == 'terrain') ? 1 : 0, //m_harmname_harm_terrain
    (mostHarmful == 'train') ? 1 : 0, //m_harmname_harm_train
    (mostHarmful == 'unknown') ? 1 : 0, //m_harmname_harm_unknown
    (mostHarmful == 'water') ? 1 : 0, //m_harmname_harm_water
    (vehicleDamage == '3') ? 1 : 0, //deformedname_Disabling Damage
    (vehicleDamage == '2') ? 1 : 0, //deformedname_Functional Damage
    (vehicleDamage == '1') ? 1 : 0, //deformedname_Minor Damage
    (vehicleDamage == '0') ? 1 : 0, //deformedname_No Damage
    (drivingLocation == 'on_ramp') ? 1 : 0, //vtrafwayname_Exit_on_ramp
    (drivingLocation == 'one_way') ? 1 : 0, //vtrafwayname_One-way
    (drivingLocation == 'park_drive') ? 1 : 0, //vtrafwayname_Parking_lot_driveway
    (drivingLocation == 'two_way') ? 1 : 0, //vtrafwayname_Two-way
    (drivingLocation == 'two_way') ? 1 : 0, //vtrafwayname_Two_way
    (drivingLocation == 'two_way_div_bar') ? 1 : 0, //vtrafwayname_Two_way_div_med_bar
    (drivingLocation == 'two_way_div_nobar') ? 1 : 0, //vtrafwayname_Two_way_div_med_nobar	
    (bodyType == 'two_door') ? 1 : 0, //bdytyp_imname_2_door_sedan
    (bodyType == 'four_sedan') ? 1 : 0, //bdytyp_imname_4_door_sedan
    (bodyType == 'atv_rec') ? 1 : 0, //bdytyp_imname_ATV_rec_vehicle	
    (bodyType == 'bus') ? 1 : 0,//bdytyp_imname_Bus
    (bodyType == 'work_equp') ? 1 : 0,//bdytyp_imname_Construction_farm_equip
    (bodyType == 'convertable') ? 1 : 0,//bdytyp_imname_Convertable
    (bodyType == 'large_suv') ? 1 : 0,//bdytyp_imname_Large_SUV
    (bodyType == 'motorcycle_trike') ? 1 : 0,//bdytyp_imname_Motorcylcle_trike
    (bodyType == 'motorhome') ? 1 : 0,//bdytyp_imname_Motorhome_RV
    (bodyType == 'small_suv_truck') ? 1 : 0,//bdytyp_imname_Small_SUV_light_truck
    (bodyType == 'truck') ? 1 : 0,//bdytyp_imname_Truck
    (bodyType == 'van') ? 1 : 0,//bdytyp_imname_Van
    (priorCrash == 'change_lane') ? 1 : 0 , //p_crash1name_Changing Lanes
    (priorCrash == 'disable_park') ? 1 : 0 , //p_crash1name_Diasbled_parked
    (priorCrash == 'straight') ? 1 : 0 , //p_crash1name_Going straight
    (priorCrash == 'u-turn') ? 1 : 0 , //p_crash1name_Making a U-turn	
    (priorCrash == 'merging') ? 1 : 0 , //p_crash1name_Merging
    (priorCrash == 'curve') ? 1 : 0 , //p_crash1name_Negotiating a Curve
    (priorCrash == 'passing') ? 1 : 0 , //p_crash1name_Passing or Overtaking Another Vehicle
    (priorCrash == 'start') ? 1 : 0 , //p_crash1name_Start on road
    (priorCrash == 'stop_back') ? 1 : 0 , //p_crash1name_Stopping_backup
    (priorCrash == 'avoid_veh') ? 1 : 0 , //p_crash1name_Successful Avoidance Maneuver to a Previous Critical Event
    (priorCrash == 'turn_left') ? 1 : 0 , //p_crash1name_Turning Left
    (priorCrash == 'right_left') ? 1 : 0 , //p_crash1name_Turning Right
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
