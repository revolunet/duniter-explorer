export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};


export type AmountWithBase = {
  __typename?: 'AmountWithBase';
  amount: Scalars['Int'];
  base: Scalars['Int'];
};

export type Block = {
  __typename?: 'Block';
  version: Scalars['Int'];
  number: Scalars['Int'];
  hash: Scalars['String'];
  signature: Scalars['String'];
  innerHash: Scalars['String'];
  previousHash?: Maybe<Scalars['String']>;
  issuer: Scalars['String'];
  time: Scalars['Int'];
  powMin: Scalars['Int'];
  membersCount: Scalars['Int'];
  issuersCount: Scalars['Int'];
  issuersFrame: Scalars['Int'];
  medianTime: Scalars['Int'];
  nonce: Scalars['Int'];
  monetaryMass: Scalars['Int'];
  unitBase: Scalars['Int'];
  dividend?: Maybe<Scalars['Int']>;
  /** Identities */
  identities: Array<Scalars['String']>;
  /** joiners */
  joiners: Array<Scalars['String']>;
  /** Actives (=renewals) */
  actives: Array<Scalars['String']>;
  /** Leavers */
  leavers: Array<Scalars['String']>;
  /** Revokeds */
  revoked: Array<Scalars['String']>;
  /** Excludeds */
  excluded: Array<Scalars['String']>;
  /** Certifications */
  certifications: Array<Scalars['String']>;
  transactions: Array<TxGva>;
};

export type BlockMeta = {
  __typename?: 'BlockMeta';
  version: Scalars['Int'];
  number: Scalars['Int'];
  hash: Scalars['String'];
  signature: Scalars['String'];
  innerHash: Scalars['String'];
  previousHash: Scalars['String'];
  issuer: Scalars['String'];
  time: Scalars['Int'];
  powMin: Scalars['Int'];
  membersCount: Scalars['Int'];
  issuersCount: Scalars['Int'];
  issuersFrame: Scalars['Int'];
  medianTime: Scalars['Int'];
  nonce: Scalars['Int'];
  monetaryMass: Scalars['Int'];
  unitBase: Scalars['Int'];
  dividend?: Maybe<Scalars['Int']>;
};

export type CurrentUdGva = {
  __typename?: 'CurrentUdGva';
  /** Ud amount */
  amount: Scalars['Int'];
  /** Ud base */
  base: Scalars['Int'];
};

export type MutationRoot = {
  __typename?: 'MutationRoot';
  /**
   * Process a transaction
   * Return the transaction if it successfully inserted
   */
  tx: TxGva;
  /**
   * Process several transactions
   * Return an array of successfully inserted transactions
   */
  txs: Array<TxGva>;
};


export type MutationRootTxArgs = {
  rawTx: Scalars['String'];
};


export type MutationRootTxsArgs = {
  rawTxs: Array<Scalars['String']>;
};

export type Node = {
  __typename?: 'Node';
  /** Peer card */
  peer?: Maybe<Peer>;
  /** Software */
  software: Scalars['String'];
  /** Software version */
  version: Scalars['String'];
};

export enum Order {
  /** Ascending order */
  Asc = 'ASC',
  /** Decreasing order */
  Desc = 'DESC'
}

/** Information about pagination in a connection */
export type PageInfo = {
  __typename?: 'PageInfo';
  /** When paginating backwards, are there more items? */
  hasPreviousPage: Scalars['Boolean'];
  /** When paginating forwards, are there more items? */
  hasNextPage: Scalars['Boolean'];
  /** When paginating backwards, the cursor to continue. */
  startCursor?: Maybe<Scalars['String']>;
  /** When paginating forwards, the cursor to continue. */
  endCursor?: Maybe<Scalars['String']>;
};

export type Pagination = {
  /** Identifier of the 1st desired element (of the last one in descending order) */
  cursor?: Maybe<Scalars['String']>;
  ord: Order;
  pageSize?: Maybe<Scalars['Int']>;
};

export type Peer = {
  __typename?: 'Peer';
  version: Scalars['Int'];
  currency: Scalars['String'];
  pubkey: Scalars['String'];
  blockstamp: Scalars['String'];
  endpoints: Array<Scalars['String']>;
  status: Scalars['String'];
  signature: Scalars['String'];
};

export type QueryRoot = {
  __typename?: 'QueryRoot';
  /** Transactions history */
  utxosOfScript: UtxoGvaConnection;
  /** Current universal dividends amount */
  currentUd?: Maybe<CurrentUdGva>;
  /** Universal dividends issued by a public key */
  udsOfPubkey: UdGvaConnection;
  /** Universal dividends revaluations */
  udsReval: Array<RevalUdGva>;
  /** Transactions waiting on mempool */
  txsHistoryMp: TxsHistoryMempool;
  /** Transactions history (written in blockchain) */
  txsHistoryBc: TxsHistoryBlockchainQueryInner;
  /** Generate simple transaction document */
  genTx: Array<Scalars['String']>;
  /** Generate complex transaction document */
  genComplexTx: RawTxOrChanges;
  /** Get blocks in current frame */
  currentFrame: Array<BlockMeta>;
  /** Get current block */
  currentBlock: Block;
  /** Account balance */
  balance: AmountWithBase;
  node: Node;
};


export type QueryRootUtxosOfScriptArgs = {
  script: Scalars['String'];
  pagination?: Pagination;
  amount?: Maybe<Scalars['Int']>;
};


export type QueryRootUdsOfPubkeyArgs = {
  pubkey: Scalars['String'];
  filter?: UdsFilter;
  pagination?: Pagination;
  amount?: Maybe<Scalars['Int']>;
};


export type QueryRootTxsHistoryMpArgs = {
  pubkey: Scalars['String'];
};


export type QueryRootTxsHistoryBcArgs = {
  pagination?: Pagination;
  pubkeyOrScript: Scalars['String'];
};


export type QueryRootGenTxArgs = {
  amount: Scalars['Int'];
  comment?: Maybe<Scalars['String']>;
  issuer: Scalars['String'];
  recipient: Scalars['String'];
  useMempoolSources?: Scalars['Boolean'];
};


export type QueryRootGenComplexTxArgs = {
  issuers: Array<TxIssuer>;
  recipients: Array<TxRecipient>;
  comment?: Maybe<Scalars['String']>;
  useMempoolSources?: Scalars['Boolean'];
};


export type QueryRootBalanceArgs = {
  script: Scalars['String'];
};

export type RawTxOrChanges = {
  __typename?: 'RawTxOrChanges';
  /** Intermediate transactions documents for compacting sources (`null` if not needed) */
  changes?: Maybe<Array<Scalars['String']>>;
  /** Transaction document that carries out the requested transfer (`null` if the amount to be sent requires too many sources) */
  tx?: Maybe<Scalars['String']>;
};

export type RevalUdGva = {
  __typename?: 'RevalUdGva';
  /** Ud amount */
  amount: Scalars['Int'];
  /** Ud base */
  base: Scalars['Int'];
  /** Number of the block that revaluate ud amount */
  blockNumber: Scalars['Int'];
};

export type SubscriptionRoot = {
  __typename?: 'SubscriptionRoot';
  receivePendingTxs: Array<TxGva>;
  newBlocks: Array<Block>;
};

export type Sum = {
  __typename?: 'Sum';
  sum: AmountWithBase;
};

export enum TxDirection {
  /** Received */
  Received = 'RECEIVED',
  /** Sent */
  Sent = 'SENT'
}

export type TxGva = {
  __typename?: 'TxGva';
  /** Version. */
  version: Scalars['Int'];
  /** Currency. */
  currency: Scalars['String'];
  /** Blockstamp */
  blockstamp: Scalars['String'];
  /** Locktime */
  locktime: Scalars['Int'];
  /** Document issuers. */
  issuers: Array<Scalars['String']>;
  /** Transaction inputs. */
  inputs: Array<Scalars['String']>;
  /** Inputs unlocks. */
  unlocks: Array<Scalars['String']>;
  /** Transaction outputs. */
  outputs: Array<Scalars['String']>;
  /** Transaction comment */
  comment: Scalars['String'];
  /** Document signatures */
  signatures: Array<Scalars['String']>;
  /** Transaction hash */
  hash: Scalars['String'];
  /** Written block */
  writtenBlock?: Maybe<Scalars['String']>;
  /** Written Time */
  writtenTime?: Maybe<Scalars['Int']>;
};

export type TxGvaConnection = {
  __typename?: 'TxGvaConnection';
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** A list of edges. */
  edges?: Maybe<Array<Maybe<TxGvaEdge>>>;
};

/** An edge in a connection. */
export type TxGvaEdge = {
  __typename?: 'TxGvaEdge';
  /** The item at the end of the edge */
  node: TxGva;
  /** A cursor for use in pagination */
  cursor: Scalars['String'];
  direction: TxDirection;
};

export type TxIssuer = {
  /** Account script (default is a script needed all provided signers) */
  script?: Maybe<Scalars['String']>;
  /** Signers */
  signers: Array<Scalars['String']>;
  /** XHX codes needed to unlock funds */
  codes?: Maybe<Array<Scalars['String']>>;
  /** Amount */
  amount: Scalars['Int'];
};

export type TxRecipient = {
  /** Amount */
  amount: Scalars['Int'];
  /** Account script */
  script: Scalars['String'];
};

export type TxsHistoryBlockchainQueryInner = {
  __typename?: 'TxsHistoryBlockchainQueryInner';
  /** Transactions history (written in blockchain) */
  both: TxGvaConnection;
  /** Received transactions history (written in blockchain) */
  received: TxGvaConnection;
  /** Sent transactions history (written in blockchain) */
  sent: TxGvaConnection;
};

export type TxsHistoryMempool = {
  __typename?: 'TxsHistoryMempool';
  /** Transactions sending */
  sending: Array<TxGva>;
  /** Transactions receiving */
  receiving: Array<TxGva>;
};

export type UdGva = {
  __typename?: 'UdGva';
  /** Ud amount */
  amount: Scalars['Int'];
  /** Ud base */
  base: Scalars['Int'];
  /** Issuer of this universal dividend */
  issuer: Scalars['String'];
  /** Number of the block that created this UD */
  blockNumber: Scalars['Int'];
  /** Blockchain time of the block that created this UD */
  blockchainTime: Scalars['Int'];
};

export type UdGvaConnection = {
  __typename?: 'UdGvaConnection';
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** A list of edges. */
  edges?: Maybe<Array<Maybe<UdGvaEdge>>>;
  aggregate: Sum;
};

/** An edge in a connection. */
export type UdGvaEdge = {
  __typename?: 'UdGvaEdge';
  /** The item at the end of the edge */
  node: UdGva;
  /** A cursor for use in pagination */
  cursor: Scalars['String'];
};

export enum UdsFilter {
  All = 'ALL',
  Unspent = 'UNSPENT'
}

export type UtxoGva = {
  __typename?: 'UtxoGva';
  /** Source amount */
  amount: Scalars['Int'];
  /** Source base */
  base: Scalars['Int'];
  /** Hash of origin transaction */
  txHash: Scalars['String'];
  /** Index of output in origin transaction */
  outputIndex: Scalars['Int'];
  /** Written block */
  writtenBlock: Scalars['Int'];
  /** Written time */
  writtenTime: Scalars['Int'];
};

export type UtxoGvaConnection = {
  __typename?: 'UtxoGvaConnection';
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** A list of edges. */
  edges?: Maybe<Array<Maybe<UtxoGvaEdge>>>;
  aggregate: Sum;
};

/** An edge in a connection. */
export type UtxoGvaEdge = {
  __typename?: 'UtxoGvaEdge';
  /** The item at the end of the edge */
  node: UtxoGva;
  /** A cursor for use in pagination */
  cursor: Scalars['String'];
};
