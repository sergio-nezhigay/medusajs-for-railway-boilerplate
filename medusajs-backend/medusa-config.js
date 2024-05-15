const dotenv = require("dotenv");

let ENV_FILE_NAME = "";
switch (process.env.NODE_ENV) {
  case "production":
    ENV_FILE_NAME = ".env.production";
    break;
  case "staging":
    ENV_FILE_NAME = ".env.staging";
    break;
  case "test":
    ENV_FILE_NAME = ".env.test";
    break;
  case "development":
  default:
    ENV_FILE_NAME = ".env";
    break;
}

try {
  dotenv.config({ path: process.cwd() + "/" + ENV_FILE_NAME });
} catch (e) {}

// CORS when consuming Medusa from admin
const ADMIN_CORS =
  process.env.ADMIN_CORS || "http://localhost:7000,http://localhost:7001";

// CORS to avoid issues when consuming Medusa from a client
const STORE_CORS = process.env.STORE_CORS || "http://localhost:8000";

const DATABASE_URL =
  process.env.DATABASE_URL || "postgres://localhost/medusa-starter-default";

const REDIS_URL = process.env.REDIS_URL || "redis://localhost:6379";

const CLOUDINARY_CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME;
const CLOUDINARY_API_KEY = process.env.CLOUDINARY_API_KEY;
const CLOUDINARY_API_SECRET = process.env.CLOUDINARY_API_SECRET;
const cloudinaryConfigured =
  CLOUDINARY_CLOUD_NAME && CLOUDINARY_API_KEY && CLOUDINARY_API_SECRET;

const ADMIN_APP_PORT = process.env.PORT || 7001;

const fileServicePlugin = cloudinaryConfigured
  ? {
      resolve: `medusa-file-cloudinary`,
      options: {
        cloud_name: CLOUDINARY_CLOUD_NAME,
        api_key: CLOUDINARY_API_KEY,
        api_secret: CLOUDINARY_API_SECRET,
        secure: true,
      },
    }
  : {
      resolve: `@medusajs/file-local`,
      options: {
        upload_dir: "uploads",
      },
    };

const plugins = [
  `medusa-fulfillment-manual`,
  `medusa-payment-manual`,
  fileServicePlugin,
  {
    resolve: "@medusajs/admin",
    /** @type {import('@medusajs/admin').PluginOptions} */
    options: {
      autoRebuild: true,
      develop: {
        open: process.env.OPEN_BROWSER !== "false",
        port: ADMIN_APP_PORT,
      },
    },
  },
  {
    resolve: `medusa-plugin-sendgrid`,
    options: {
      api_key: process.env.SENDGRID_API_KEY,
      from: process.env.SENDGRID_FROM,
      order_placed_template: process.env.SENDGRID_ORDER_PLACED_ID,
      customer_password_reset_template: process.env.SENDGRID_ORDER_PLACED_ID,
      user_password_reset_template: process.env.SENDGRID_ORDER_PLACED_ID,
    },
  },
  {
    resolve: `medusa-plugin-meilisearch`,
    options: {
      // config object passed when creating an instance
      // of the MeiliSearch client
      config: {
        host: process.env.MEILISEARCH_HOST,
        apiKey: process.env.MEILISEARCH_API_KEY,
      },
      settings: {
        products: {
          indexSettings: {
            searchableAttributes: ["title", "description", "variant_sku"],
            displayedAttributes: [
              "id",
              "title",
              "description",
              "variant_sku",
              "thumbnail",
              "handle",
            ],
          },
          primaryKey: "id",
        },
      },
    },
  },
  //  {
  //    resolve: `medusa-multilingual-tolgee`,
  //    options: {
  //      baseURL: process.env.MEDUSA_ADMIN_TOLGEE_API_URL,
  //      apiKey: process.env.MEDUSA_ADMIN_TOLGEE_API_KEY,
  //      defaultLanguage: "en",
  //      availableLanguages: [
  //        { label: "English", tag: "en" },
  //        { label: "German", tag: "de" },
  //        { label: "Polish", tag: "pl" },
  //      ],
  //      productsKeys: ["title", "subtitle", "description"],
  //      projectId: "7212",
  //      enableUI: true,
  //    },
  //  },
  {
    resolve: `medusa-file-s3`,
    options: {
      s3_url: process.env.S3_URL,
      bucket: process.env.S3_BUCKET,
      region: process.env.S3_REGION,
      access_key_id: process.env.S3_ACCESS_KEY_ID,
      secret_access_key: process.env.S3_SECRET_ACCESS_KEY,
      cache_control: process.env.S3_CACHE_CONTROL,
      // optional
      //  download_file_duration: process.env.S3_DOWNLOAD_FILE_DURATION,
      //  prefix: process.env.S3_PREFIX,
    },
  },
];

const modules = {
  eventBus: {
    resolve: "@medusajs/event-bus-redis",
    options: {
      redisUrl: REDIS_URL,
    },
  },
  cacheService: {
    resolve: "@medusajs/cache-redis",
    options: {
      redisUrl: REDIS_URL,
    },
  },
};

/** @type {import('@medusajs/medusa').ConfigModule["projectConfig"]} */
const projectConfig = {
  jwtSecret: process.env.JWT_SECRET,
  cookieSecret: process.env.COOKIE_SECRET,
  store_cors: STORE_CORS,
  database_url: DATABASE_URL,
  admin_cors: ADMIN_CORS,
  // Uncomment the following lines to enable REDIS
  redis_url: REDIS_URL,
};

/** @type {import('@medusajs/medusa').ConfigModule} */
module.exports = {
  projectConfig,
  plugins,
  modules,
};
