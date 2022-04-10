'use strict'

const getsavednotes=function(){
    const notesjson=localStorage.getItem('notes')
if(notesjson!=null){
  return JSON.parse(notesjson)
}
else{
    return []
}
}
// remove anote from list
const removenote=function(id){
  const noteindex=notes.findIndex(function(note){
    return note.id===id
  })
  if(noteindex > -1){
    notes.splice(noteindex,1)
  }
}


const savenotes=function(notes){
    localStorage.setItem('notes',JSON.stringify(notes))
}
//generate dom structure for note
const generatenotedom=function(note){
    const noteEl=document.createElement('a')
    const textEl=document.createElement('p')
    const statusEl=document.createElement('p')
   
    //set note title text
    if(note.title.length>0){
      textEl.textContent=note.title
    }
    else{
      textEl.textContent='unnamed'
    }
    textEl.classList.add('list-item__title')
    noteEl.appendChild(textEl)
    //set up the link
    noteEl.setAttribute('href', `note.html#${note.id}`)
    noteEl.classList.add('list-item')
    // setup the staus message
    statusEl.textContent=generateLastEdited(note.updatedAt)
    statusEl.classList.add('list-item__subtitle')
    noteEl.appendChild(statusEl)
   return noteEl
}
//sort your notes by one of three 
const sortNotes=function(notes,sortBy){
  if(sortBy === 'by edited'){
    return notes.sort(function(a,b){
      if(a.updatedAt>b.updatedAt){
        return -1
      }
      else if(a.updatedAt<b.updatedAt){
        return 1
      }
      else {return 0
    }
      
  })

  }
  else if(sortBy==='by created'){
    return notes.sort(function(a,b){
        if(a.createdAt>b.createdAt){
            return -1
        }
        else if(a.createdAt<b.createdAt){
            return 1
        }
        else {
            return 0
        }
    })

}
else if(sortBy==='by alphabet'){
  return notes.sort(function(a,b){
   if (a.title.toLowerCase()<b.title.toLowerCase()){
     return -1
   }
   else if(a.title.toLowerCase()>b.title.toLowerCase()){
     return 1
   }
   else 
   {return 0
   }
  })
}
   
  else {
    return notes
  }

}
const rendernotes=function(notes,filters){
  const notesEl=document.querySelector('#notes')
  notes=sortNotes(notes,filters.sortBy)
    const filterednotes=notes.filter(function(note){
      return note.title.toLowerCase().includes(filters.text.toLowerCase())
    })
     notesEl.innerHTML=''
     if(filterednotes.length>0){
      filterednotes.forEach(function(note){
        const noteEl=generatenotedom(note)
        notesEl.appendChild(noteEl)
       })

     }else{
       const emptyMessage=document.createElement('p')
       emptyMessage.textContent='No notes to show'
       emptyMessage.classList.add('empty-message')
       notesEl.appendChild(emptyMessage)

     }
    
  }
  const generateLastEdited=function(timestamp){
    return `last edited ${moment(timestamp).fromNow()}`

  }