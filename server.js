const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');

const routesV1 = require('./src/v1/routes');
const swaggerDocumentV1 = YAML.load('./src/v1/config/swagger.yaml');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Use API routes
app.use('/api/v1', routesV1);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocumentV1));

// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
