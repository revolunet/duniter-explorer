# Duniter explorer

A static frontend to explore the [Duniter](https://duniter.org/) blockchain

Uses [GVA (GraphQL Verification API)](https://g1.librelois.fr/gva) and [BMA](https://github.com/duniter/duniter-bma/blob/master/doc/API.md) for the blockchain data and the [Cesium+ API](http://doc.e-is.pro/cesium-plus-pod/REST_API.html) for additionnal informations (profiles, avatars...)

Demo : https://revolunet.github.io/duniter-explorer/

## Development

```
yarn dev
```

Then open https://127.0.0.1:3000/duniter-explorer/

### Update GVA TypeScript definitions

`yarn update-gva-definitions` will produce up-to-date definitions in `src/types/gva.d.ts`

### Environment variables

| Key              | value                       |
| ---------------- | --------------------------- |
| GVA_ENDPOINT     | https://g1.librelois.fr/gva |
| G1_DATA_NODE_URL | https://g1.data.le-sou.org  |

### Références

- [GVA GraphiQL](https://g1.librelois.fr/gva)
- [BMA reference](https://github.com/duniter/duniter-bma/blob/master/doc/API.md)
- [Duniter_Blockchain_Protocol_V12](https://git.duniter.org/nodes/common/doc/-/blob/master/rfc/0010_Duniter_Blockchain_Protocol_V12.md)
