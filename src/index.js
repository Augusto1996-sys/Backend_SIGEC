const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const cookieParser= require('cookie-parser');

const app = express();
app.use(cookieParser());
app.use(cors()); //Abre as portas para ser acedido pelo sistema que nos quisermis  de como esta recebi qualquer um mais podemos entregar como parametro o sistema qiue opode aceder
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false}));
require('./app/routers/rotas_tipo_usuario')(app);
require('./app/routers/rotas_usuario')(app);

require('./app/routers/rotas_material')(app);
require('./app/routers/rotas_operario')(app);

require('./app/routers/rotas_operario_linha')(app);
require('./app/routers/rotas_tecido')(app);
require('./app/routers/rotas_intertela')(app);
require('./app/routers/rotas_bolso')(app);
require('./app/routers/rotas_rolos')(app);
require('./app/routers/rotas_material1')(app);

require('./app/routers/rotas_materialg1')(app);
require('./app/routers/rotas_cutsheet')(app);
require('./app/routers/rotas_stock')(app);


require('./app/routers/rotas_cutsheetCalsa')(app);
require('./app/routers/rotas_cutsheetCamisa')(app);
require('./app/routers/rotas_requisicao')(app);
app.listen(3333);



