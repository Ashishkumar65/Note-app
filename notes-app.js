let notes = getsavednotes()
  
  const filters={
        text: ''
  }

  rendernotes(notes,filters)
  

  document.querySelector('#create-note').addEventListener('click',function(e){
      id=uuidv4()
    notes.push({
      id:id,
      title:'',
      body:''
    })
   savenotes(notes)
   location.assign(`note.html#${id}`)
  })
  
  document.querySelector('#search-text').addEventListener('input',function(e){
    filters.text=e.target.value
    rendernotes(notes,filters)
  })
  
  document.querySelector('#filter-by').addEventListener('change',function(e){
    console.log(e.target.value)
  })

  window.addEventListener('storage',function(e){
    if(e.key==='notes'){
      notes=JSON.parse(e.newValue)
      rendernotes(notes,filters)
    }
  })