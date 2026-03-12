
Object.defineProperty(exports, "__esModule", { value: true });

const {
  Decimal,
  objectEnumValues,
  makeStrictEnum,
  Public,
  getRuntime,
  skip
} = require('./runtime/index-browser.js')


const Prisma = {}

exports.Prisma = Prisma
exports.$Enums = {}

/**
 * Prisma Client JS version: 5.22.0
 * Query Engine version: 605197351a3c8bdd595af2d2a9bc3025bca48ea2
 */
Prisma.prismaVersion = {
  client: "5.22.0",
  engine: "605197351a3c8bdd595af2d2a9bc3025bca48ea2"
}

Prisma.PrismaClientKnownRequestError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientKnownRequestError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)};
Prisma.PrismaClientUnknownRequestError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientUnknownRequestError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientRustPanicError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientRustPanicError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientInitializationError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientInitializationError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientValidationError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientValidationError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.NotFoundError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`NotFoundError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.Decimal = Decimal

/**
 * Re-export of sql-template-tag
 */
Prisma.sql = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`sqltag is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.empty = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`empty is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.join = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`join is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.raw = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`raw is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.validator = Public.validator

/**
* Extensions
*/
Prisma.getExtensionContext = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`Extensions.getExtensionContext is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.defineExtension = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`Extensions.defineExtension is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}

/**
 * Shorthand utilities for JSON filtering
 */
Prisma.DbNull = objectEnumValues.instances.DbNull
Prisma.JsonNull = objectEnumValues.instances.JsonNull
Prisma.AnyNull = objectEnumValues.instances.AnyNull

Prisma.NullTypes = {
  DbNull: objectEnumValues.classes.DbNull,
  JsonNull: objectEnumValues.classes.JsonNull,
  AnyNull: objectEnumValues.classes.AnyNull
}



/**
 * Enums
 */

exports.Prisma.TransactionIsolationLevel = makeStrictEnum({
  ReadUncommitted: 'ReadUncommitted',
  ReadCommitted: 'ReadCommitted',
  RepeatableRead: 'RepeatableRead',
  Serializable: 'Serializable'
});

exports.Prisma.AccountScalarFieldEnum = {
  id: 'id',
  userId: 'userId',
  type: 'type',
  provider: 'provider',
  providerAccountId: 'providerAccountId',
  refresh_token: 'refresh_token',
  access_token: 'access_token',
  expires_at: 'expires_at',
  token_type: 'token_type',
  scope: 'scope',
  id_token: 'id_token',
  session_state: 'session_state'
};

exports.Prisma.SessionScalarFieldEnum = {
  id: 'id',
  sessionToken: 'sessionToken',
  userId: 'userId',
  expires: 'expires'
};

exports.Prisma.UserScalarFieldEnum = {
  id: 'id',
  name: 'name',
  email: 'email',
  emailVerified: 'emailVerified',
  image: 'image',
  password: 'password',
  role: 'role',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  permissions: 'permissions'
};

exports.Prisma.VerificationTokenScalarFieldEnum = {
  identifier: 'identifier',
  token: 'token',
  expires: 'expires'
};

exports.Prisma.VendorScalarFieldEnum = {
  id: 'id',
  userId: 'userId',
  storeName: 'storeName',
  description: 'description',
  logo: 'logo',
  banner: 'banner',
  location: 'location',
  rating: 'rating',
  reviewCount: 'reviewCount',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  isVerified: 'isVerified',
  businessType: 'businessType',
  longDescription: 'longDescription',
  badgeType: 'badgeType',
  regNumber: 'regNumber',
  categories: 'categories',
  shippingCountries: 'shippingCountries',
  paymentOptions: 'paymentOptions',
  contactEmail: 'contactEmail',
  contactPhone: 'contactPhone',
  website: 'website',
  address: 'address',
  businessHours: 'businessHours',
  certifications: 'certifications',
  productionCapacity: 'productionCapacity',
  minOrderWholesale: 'minOrderWholesale',
  minOrderRetail: 'minOrderRetail'
};

exports.Prisma.ProductScalarFieldEnum = {
  id: 'id',
  vendorId: 'vendorId',
  name: 'name',
  description: 'description',
  price: 'price',
  wholesalePrice: 'wholesalePrice',
  minWholesaleQty: 'minWholesaleQty',
  isWholesale: 'isWholesale',
  isRetail: 'isRetail',
  images: 'images',
  category: 'category',
  stock: 'stock',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  currency: 'currency',
  isFeatured: 'isFeatured'
};

exports.Prisma.OrderScalarFieldEnum = {
  id: 'id',
  userId: 'userId',
  status: 'status',
  total: 'total',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  currency: 'currency'
};

exports.Prisma.OrderItemScalarFieldEnum = {
  id: 'id',
  orderId: 'orderId',
  productId: 'productId',
  quantity: 'quantity',
  price: 'price'
};

exports.Prisma.QuoteScalarFieldEnum = {
  id: 'id',
  userId: 'userId',
  status: 'status',
  total: 'total',
  currency: 'currency',
  validUntil: 'validUntil',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.QuoteItemScalarFieldEnum = {
  id: 'id',
  quoteId: 'quoteId',
  productId: 'productId',
  quantity: 'quantity',
  targetPrice: 'targetPrice'
};

exports.Prisma.InvoiceScalarFieldEnum = {
  id: 'id',
  orderId: 'orderId',
  userId: 'userId',
  status: 'status',
  total: 'total',
  currency: 'currency',
  dueDate: 'dueDate',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.InvoiceItemScalarFieldEnum = {
  id: 'id',
  invoiceId: 'invoiceId',
  description: 'description',
  quantity: 'quantity',
  price: 'price'
};

exports.Prisma.CurrencyScalarFieldEnum = {
  id: 'id',
  code: 'code',
  name: 'name',
  symbol: 'symbol',
  rate: 'rate',
  updatedAt: 'updatedAt'
};

exports.Prisma.CMSConfigScalarFieldEnum = {
  id: 'id',
  key: 'key',
  value: 'value',
  updatedAt: 'updatedAt'
};

exports.Prisma.CategoryScalarFieldEnum = {
  id: 'id',
  name: 'name',
  slug: 'slug',
  image: 'image',
  isFeatured: 'isFeatured',
  displayOrder: 'displayOrder',
  parentId: 'parentId',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.AboutPageScalarFieldEnum = {
  id: 'id',
  heroTitle: 'heroTitle',
  heroDescription: 'heroDescription',
  heroCTA: 'heroCTA',
  storyTitle: 'storyTitle',
  storyContent: 'storyContent',
  storyImage: 'storyImage',
  missionTitle: 'missionTitle',
  missionDescription: 'missionDescription',
  missionPoints: 'missionPoints',
  teamDescription: 'teamDescription',
  teamMembers: 'teamMembers',
  partnersDescription: 'partnersDescription',
  partners: 'partners',
  impactTitle: 'impactTitle',
  impactDescription: 'impactDescription',
  impactStats: 'impactStats',
  countriesTitle: 'countriesTitle',
  countriesDescription: 'countriesDescription',
  countries: 'countries',
  updatedAt: 'updatedAt'
};

exports.Prisma.SortOrder = {
  asc: 'asc',
  desc: 'desc'
};

exports.Prisma.NullableJsonNullValueInput = {
  DbNull: Prisma.DbNull,
  JsonNull: Prisma.JsonNull
};

exports.Prisma.JsonNullValueInput = {
  JsonNull: Prisma.JsonNull
};

exports.Prisma.QueryMode = {
  default: 'default',
  insensitive: 'insensitive'
};

exports.Prisma.NullsOrder = {
  first: 'first',
  last: 'last'
};

exports.Prisma.JsonNullValueFilter = {
  DbNull: Prisma.DbNull,
  JsonNull: Prisma.JsonNull,
  AnyNull: Prisma.AnyNull
};
exports.UserRole = exports.$Enums.UserRole = {
  BUYER: 'BUYER',
  VENDOR: 'VENDOR',
  ADMIN: 'ADMIN',
  SUPER_ADMIN: 'SUPER_ADMIN'
};

exports.Prisma.ModelName = {
  Account: 'Account',
  Session: 'Session',
  User: 'User',
  VerificationToken: 'VerificationToken',
  Vendor: 'Vendor',
  Product: 'Product',
  Order: 'Order',
  OrderItem: 'OrderItem',
  Quote: 'Quote',
  QuoteItem: 'QuoteItem',
  Invoice: 'Invoice',
  InvoiceItem: 'InvoiceItem',
  Currency: 'Currency',
  CMSConfig: 'CMSConfig',
  Category: 'Category',
  AboutPage: 'AboutPage'
};

/**
 * This is a stub Prisma Client that will error at runtime if called.
 */
class PrismaClient {
  constructor() {
    return new Proxy(this, {
      get(target, prop) {
        let message
        const runtime = getRuntime()
        if (runtime.isEdge) {
          message = `PrismaClient is not configured to run in ${runtime.prettyName}. In order to run Prisma Client on edge runtime, either:
- Use Prisma Accelerate: https://pris.ly/d/accelerate
- Use Driver Adapters: https://pris.ly/d/driver-adapters
`;
        } else {
          message = 'PrismaClient is unable to run in this browser environment, or has been bundled for the browser (running in `' + runtime.prettyName + '`).'
        }
        
        message += `
If this is unexpected, please open an issue: https://pris.ly/prisma-prisma-bug-report`

        throw new Error(message)
      }
    })
  }
}

exports.PrismaClient = PrismaClient

Object.assign(exports, Prisma)
