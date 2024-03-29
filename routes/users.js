
var express = require('express');
var router = express.Router();

const knex = require('../db/knex');


//routing read database postgrsql


router.get('/', (req, res) => {
  knex('usuario')
    .select()
    .then(usuarios =>{
      res.render('user/index', { title: "Usuarios", objUsuarios: usuarios });
  });  
});


//routing new + form+ get
router.get('/new', (req, res) => {
  res.render('user/new', { title: "Form Users" });
});

function seleccionJugador(){
  alert('hola');
}

function respondAndRenderUser(id){  
  if(typeof id != 'undefined'){
    
  }else{
    
    res.status(500);
    alert('hola');
     
  }  
}




router.get('/:id/edit', (req,res) => {
  const id = req.params.id;
  console.log('edit id:'+id);
  respondAndRenderTodo(id,res,'user/edit');  
});

//routing new + form + post
router.post('/', (req, res) => {  
 validateTodoRenderError(req, res, (usuarios) => {
    knex('usuario')
      .insert(usuarios, 'id')
      .then(ids => {
        const id = ids[0];
        res.redirect(`/user/${id}`);
      });
  });
});

router.put('/:id',(req,res) => {
  console.log('updating...');
  validateTodoRenderError(req,res,(usuarios) => {
    knex('usuario')
      .where('id',req.params.id)
      .update({tipo_usuario_id : req.body.tipo_usuario_id, nombre: req.body.nombre, username: req.body.username, password : req.body.password,
      url_foto : req.body.url_foto} )
      .then( () =>  {
        res.redirect(`/user`);
      });
  });   
});


router.delete('/:id', (req, res) => {
  console.log('deleting...');
  const id = req.params.id;
  if(validId(id)) {
    knex('usuario')
      .where('id', id)
      .del()
      .then(() => {
        res.redirect('/user');
      });
  } else {
    res.status( 500);
   res.render('error', {
      message:  'Invalid id'
    });
  }
});

function validateTodoRenderError(req, res, callback) {  
  console.log(validTodo(req.body));
  if(validTodo(req.body)) {
    //alert(validTodo(req.body));
    const usuario = {
      tipo_usuario_id : req.body.tipo_usuario_id,
      nombre : req.body.nombre,
      username : req.body.username,
      password : req.body.password,
      url_foto : req.body.url_foto    
    };
    callback(usuario);
  } else {
    res.status( 500);
    res.render('error', {
      message:  'Invalid todo'
    });
  }
}

function respondAndRenderTodo(id, res, viewName) {
  if(validId(id)) {
    knex('usuario')
      .select()
      .where('id', id)
      .first()
      .then(usuarios=> {
        res.render(viewName, {user: usuarios});
      });
  } else {
    res.status( 500);
    res.render('error', {
      message:  'Invalid id'
    });
  }
}

function validTodo(usuarios) {
  /*return typeof usuarios.nombre == 'string' &&
          usuarios.nombre.trim() != '' &&

          typeof usuarios.tipo_usuario != 'undefined' &&
          !isNaN(usuarios.tipo_usuario);*/
          return true;
}



function validId(id) {
  return !isNaN(id);
}



module.exports = router;


