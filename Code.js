var sheetid = '' // type the sheet id 
var ss = SpreadsheetApp.openById(sheetid) // now i am in the spreadsheet
var fsheet = ss.getSheetByName('Form responses 1') // now i selected this sheet

// the api must return something like this

// var res = {
//   general: {
//     website_name: '',
//     logo: '',
//     h1: '',
//     h2: '',
//     cv: ''
//   },
//   contact: {
//     email: '',
//     number: '',
//     location: '',
//     ig: '',
//     fb: '',
//     li: '',
//     tw: ''
//   },
//   personal: {
//     age: '',
//     about: '',
//     lang: ''
//   },
//   skills: [
//     { name: '', perc: '' }
//   ],
//   projects: [
//     { title: '', category: '', image: '' }
//   ]

// }



function GetProfile() {

  var lr = fsheet.getLastRow()
  var profile = {
    general: {
      website_name: get_last_value(lr, 'B'),
      logo: public(get_last_value(lr, 'C')),
      h1: get_last_value(lr, 'D'),
      h2: get_last_value(lr, 'E'),
      cv: public(get_last_value(lr, 'F')),
    },
    contact: {
      number: get_last_value(lr, 'G'),
      email: get_last_value(lr, 'H'),
      location: get_last_value(lr, 'I'),
      gh: get_last_value(lr, 'J'),
      fb: get_last_value(lr, 'K'),
      li: get_last_value(lr, 'L'),
      tw: get_last_value(lr, 'M'),
    },
    personal: {
      age: get_last_value(lr, 'N'),
      lang: get_last_value(lr, 'O'),
      about: get_last_value(lr, 'P'),
    },
    skills: get_skills(),
    projects: get_projects()

  }
  Logger.log(profile)
  return profile

}

//write a function that runs when a null value is detected , and returns the last modified value
function get_last_value(row, col) {
  // row represent the start point 
  for (let i = row; i >= 2; i--) {
    var cell = fsheet.getRange(`${col}${i}`).getValue()
    if (cell != '') return cell
  }
}
function get_skills() {
  //it will return array of obj(skill)
  var skills = []
  var lr = fsheet.getLastRow()
  for (let i = 2; i <= lr; i++) {
    var name = fsheet.getRange(`Q${i}`).getValue()
    var perc = fsheet.getRange(`R${i}`).getValue()
    if (name != '' && perc != '') skills.push({
      name: name,
      perc: perc
    })
  }
  // Logger.log(skills)
  return skills
}
function get_projects() {
  //it will return array of obj(skill)
  var projects = []
  var lr = fsheet.getLastRow()
  for (let i = 2; i <= lr; i++) {
    var title = fsheet.getRange(`S${i}`).getValue()
    var category = fsheet.getRange(`T${i}`).getValue()
    var image = fsheet.getRange(`U${i}`).getValue()

    if (title != '' && category != '' && image != '') projects.push({
      title: title,
      category: category,
      image: public(image)
    })
  }
  // Logger.log(projects)
  return projects
}

function modify_url(src) {
  var id = src.slice(
    src.indexOf('=') + 1,
    src.lastIndexOf(''),
  );
}

function public(link) {
  // var link = 'https://drive.google.com/open?id=xxxxxxx'
  // takes file and make it public
  // extract id
  var id = link.slice(
    link.indexOf('=') + 1,
    link.lastIndexOf(''),
  )
  var file = DriveApp.getFileById(id)
  file.setSharing(DriveApp.Access.ANYONE_WITH_LINK,DriveApp.Permission.VIEW)
  return `https://drive.google.com/uc?export=view&id=${id}`
}

//for any queries mashoun.me@gmail.com

