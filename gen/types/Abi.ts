/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumber,
  BigNumberish,
  BytesLike,
  CallOverrides,
  ContractTransaction,
  Overrides,
  PayableOverrides,
  PopulatedTransaction,
  Signer,
  utils,
} from "ethers";
import type {
  FunctionFragment,
  Result,
  EventFragment,
} from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type {
  TypedEventFilter,
  TypedEvent,
  TypedListener,
  OnEvent,
} from "./common";

export interface AbiInterface extends utils.Interface {
  functions: {
    "addReview(address,uint256)": FunctionFragment;
    "approve(address,uint256)": FunctionFragment;
    "balanceOf(address)": FunctionFragment;
    "bid(uint256,uint256,string)": FunctionFragment;
    "closeBidding(uint256)": FunctionFragment;
    "collectFunds()": FunctionFragment;
    "confirmPayment(uint256)": FunctionFragment;
    "createDeal(string,string,uint256)": FunctionFragment;
    "dealIdByHash(string)": FunctionFragment;
    "dealIndex()": FunctionFragment;
    "deals(uint256)": FunctionFragment;
    "defaultOnPayment(uint256)": FunctionFragment;
    "getApproved(uint256)": FunctionFragment;
    "getDealsLenght()": FunctionFragment;
    "getPendingBid(uint256,uint256)": FunctionFragment;
    "isApprovedForAll(address,address)": FunctionFragment;
    "name()": FunctionFragment;
    "owner()": FunctionFragment;
    "ownerOf(uint256)": FunctionFragment;
    "safeTransferFrom(address,address,uint256)": FunctionFragment;
    "safeTransferFrom(address,address,uint256,bytes)": FunctionFragment;
    "scores(address)": FunctionFragment;
    "setApprovalForAll(address,bool)": FunctionFragment;
    "submitCID(uint256,string)": FunctionFragment;
    "supportsInterface(bytes4)": FunctionFragment;
    "symbol()": FunctionFragment;
    "tokenURI(uint256)": FunctionFragment;
    "transferFrom(address,address,uint256)": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | "addReview"
      | "approve"
      | "balanceOf"
      | "bid"
      | "closeBidding"
      | "collectFunds"
      | "confirmPayment"
      | "createDeal"
      | "dealIdByHash"
      | "dealIndex"
      | "deals"
      | "defaultOnPayment"
      | "getApproved"
      | "getDealsLenght"
      | "getPendingBid"
      | "isApprovedForAll"
      | "name"
      | "owner"
      | "ownerOf"
      | "safeTransferFrom(address,address,uint256)"
      | "safeTransferFrom(address,address,uint256,bytes)"
      | "scores"
      | "setApprovalForAll"
      | "submitCID"
      | "supportsInterface"
      | "symbol"
      | "tokenURI"
      | "transferFrom"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "addReview",
    values: [string, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "approve",
    values: [string, BigNumberish]
  ): string;
  encodeFunctionData(functionFragment: "balanceOf", values: [string]): string;
  encodeFunctionData(
    functionFragment: "bid",
    values: [BigNumberish, BigNumberish, string]
  ): string;
  encodeFunctionData(
    functionFragment: "closeBidding",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "collectFunds",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "confirmPayment",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "createDeal",
    values: [string, string, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "dealIdByHash",
    values: [string]
  ): string;
  encodeFunctionData(functionFragment: "dealIndex", values?: undefined): string;
  encodeFunctionData(functionFragment: "deals", values: [BigNumberish]): string;
  encodeFunctionData(
    functionFragment: "defaultOnPayment",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "getApproved",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "getDealsLenght",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "getPendingBid",
    values: [BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "isApprovedForAll",
    values: [string, string]
  ): string;
  encodeFunctionData(functionFragment: "name", values?: undefined): string;
  encodeFunctionData(functionFragment: "owner", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "ownerOf",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "safeTransferFrom(address,address,uint256)",
    values: [string, string, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "safeTransferFrom(address,address,uint256,bytes)",
    values: [string, string, BigNumberish, BytesLike]
  ): string;
  encodeFunctionData(functionFragment: "scores", values: [string]): string;
  encodeFunctionData(
    functionFragment: "setApprovalForAll",
    values: [string, boolean]
  ): string;
  encodeFunctionData(
    functionFragment: "submitCID",
    values: [BigNumberish, string]
  ): string;
  encodeFunctionData(
    functionFragment: "supportsInterface",
    values: [BytesLike]
  ): string;
  encodeFunctionData(functionFragment: "symbol", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "tokenURI",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "transferFrom",
    values: [string, string, BigNumberish]
  ): string;

  decodeFunctionResult(functionFragment: "addReview", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "approve", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "balanceOf", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "bid", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "closeBidding",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "collectFunds",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "confirmPayment",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "createDeal", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "dealIdByHash",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "dealIndex", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "deals", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "defaultOnPayment",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getApproved",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getDealsLenght",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getPendingBid",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "isApprovedForAll",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "name", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "owner", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "ownerOf", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "safeTransferFrom(address,address,uint256)",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "safeTransferFrom(address,address,uint256,bytes)",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "scores", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "setApprovalForAll",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "submitCID", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "supportsInterface",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "symbol", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "tokenURI", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "transferFrom",
    data: BytesLike
  ): Result;

  events: {
    "Approval(address,address,uint256)": EventFragment;
    "ApprovalForAll(address,address,bool)": EventFragment;
    "Transfer(address,address,uint256)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "Approval"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "ApprovalForAll"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "Transfer"): EventFragment;
}

export interface ApprovalEventObject {
  owner: string;
  approved: string;
  tokenId: BigNumber;
}
export type ApprovalEvent = TypedEvent<
  [string, string, BigNumber],
  ApprovalEventObject
>;

export type ApprovalEventFilter = TypedEventFilter<ApprovalEvent>;

export interface ApprovalForAllEventObject {
  owner: string;
  operator: string;
  approved: boolean;
}
export type ApprovalForAllEvent = TypedEvent<
  [string, string, boolean],
  ApprovalForAllEventObject
>;

export type ApprovalForAllEventFilter = TypedEventFilter<ApprovalForAllEvent>;

export interface TransferEventObject {
  from: string;
  to: string;
  tokenId: BigNumber;
}
export type TransferEvent = TypedEvent<
  [string, string, BigNumber],
  TransferEventObject
>;

export type TransferEventFilter = TypedEventFilter<TransferEvent>;

export interface Abi extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: AbiInterface;

  queryFilter<TEvent extends TypedEvent>(
    event: TypedEventFilter<TEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TEvent>>;

  listeners<TEvent extends TypedEvent>(
    eventFilter?: TypedEventFilter<TEvent>
  ): Array<TypedListener<TEvent>>;
  listeners(eventName?: string): Array<Listener>;
  removeAllListeners<TEvent extends TypedEvent>(
    eventFilter: TypedEventFilter<TEvent>
  ): this;
  removeAllListeners(eventName?: string): this;
  off: OnEvent<this>;
  on: OnEvent<this>;
  once: OnEvent<this>;
  removeListener: OnEvent<this>;

  functions: {
    addReview(
      _addr: string,
      _score: BigNumberish,
      overrides?: PayableOverrides & { from?: string }
    ): Promise<ContractTransaction>;

    approve(
      to: string,
      tokenId: BigNumberish,
      overrides?: Overrides & { from?: string }
    ): Promise<ContractTransaction>;

    balanceOf(owner: string, overrides?: CallOverrides): Promise<[BigNumber]>;

    bid(
      dealId: BigNumberish,
      bidAmount: BigNumberish,
      _pk: string,
      overrides?: PayableOverrides & { from?: string }
    ): Promise<ContractTransaction>;

    closeBidding(
      dealId: BigNumberish,
      overrides?: Overrides & { from?: string }
    ): Promise<ContractTransaction>;

    collectFunds(
      overrides?: Overrides & { from?: string }
    ): Promise<ContractTransaction>;

    confirmPayment(
      dealId: BigNumberish,
      overrides?: PayableOverrides & { from?: string }
    ): Promise<ContractTransaction>;

    createDeal(
      _hash: string,
      _dscHash: string,
      _startPrice: BigNumberish,
      overrides?: Overrides & { from?: string }
    ): Promise<ContractTransaction>;

    dealIdByHash(arg0: string, overrides?: CallOverrides): Promise<[BigNumber]>;

    dealIndex(overrides?: CallOverrides): Promise<[BigNumber]>;

    deals(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<
      [
        string,
        BigNumber,
        string,
        string,
        number,
        string,
        string,
        string,
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber
      ] & {
        seller: string;
        highestBid: BigNumber;
        highestBidder: string;
        highestBiddersPK: string;
        status: number;
        hash: string;
        dscHash: string;
        cid: string;
        endBlock: BigNumber;
        payWindow: BigNumber;
        startPrice: BigNumber;
        dealIndex: BigNumber;
      }
    >;

    defaultOnPayment(
      dealId: BigNumberish,
      overrides?: Overrides & { from?: string }
    ): Promise<ContractTransaction>;

    getApproved(
      tokenId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[string]>;

    getDealsLenght(overrides?: CallOverrides): Promise<[BigNumber]>;

    getPendingBid(
      dealId: BigNumberish,
      bidIndex: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[string, BigNumber, string]>;

    isApprovedForAll(
      owner: string,
      operator: string,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    name(overrides?: CallOverrides): Promise<[string]>;

    owner(overrides?: CallOverrides): Promise<[string]>;

    ownerOf(
      tokenId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[string]>;

    "safeTransferFrom(address,address,uint256)"(
      from: string,
      to: string,
      tokenId: BigNumberish,
      overrides?: Overrides & { from?: string }
    ): Promise<ContractTransaction>;

    "safeTransferFrom(address,address,uint256,bytes)"(
      from: string,
      to: string,
      tokenId: BigNumberish,
      data: BytesLike,
      overrides?: Overrides & { from?: string }
    ): Promise<ContractTransaction>;

    scores(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<
      [BigNumber, BigNumber] & { score: BigNumber; reviewNum: BigNumber }
    >;

    setApprovalForAll(
      operator: string,
      approved: boolean,
      overrides?: Overrides & { from?: string }
    ): Promise<ContractTransaction>;

    submitCID(
      dealId: BigNumberish,
      cid: string,
      overrides?: Overrides & { from?: string }
    ): Promise<ContractTransaction>;

    supportsInterface(
      interfaceId: BytesLike,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    symbol(overrides?: CallOverrides): Promise<[string]>;

    tokenURI(
      tokenId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[string]>;

    transferFrom(
      from: string,
      to: string,
      tokenId: BigNumberish,
      overrides?: Overrides & { from?: string }
    ): Promise<ContractTransaction>;
  };

  addReview(
    _addr: string,
    _score: BigNumberish,
    overrides?: PayableOverrides & { from?: string }
  ): Promise<ContractTransaction>;

  approve(
    to: string,
    tokenId: BigNumberish,
    overrides?: Overrides & { from?: string }
  ): Promise<ContractTransaction>;

  balanceOf(owner: string, overrides?: CallOverrides): Promise<BigNumber>;

  bid(
    dealId: BigNumberish,
    bidAmount: BigNumberish,
    _pk: string,
    overrides?: PayableOverrides & { from?: string }
  ): Promise<ContractTransaction>;

  closeBidding(
    dealId: BigNumberish,
    overrides?: Overrides & { from?: string }
  ): Promise<ContractTransaction>;

  collectFunds(
    overrides?: Overrides & { from?: string }
  ): Promise<ContractTransaction>;

  confirmPayment(
    dealId: BigNumberish,
    overrides?: PayableOverrides & { from?: string }
  ): Promise<ContractTransaction>;

  createDeal(
    _hash: string,
    _dscHash: string,
    _startPrice: BigNumberish,
    overrides?: Overrides & { from?: string }
  ): Promise<ContractTransaction>;

  dealIdByHash(arg0: string, overrides?: CallOverrides): Promise<BigNumber>;

  dealIndex(overrides?: CallOverrides): Promise<BigNumber>;

  deals(
    arg0: BigNumberish,
    overrides?: CallOverrides
  ): Promise<
    [
      string,
      BigNumber,
      string,
      string,
      number,
      string,
      string,
      string,
      BigNumber,
      BigNumber,
      BigNumber,
      BigNumber
    ] & {
      seller: string;
      highestBid: BigNumber;
      highestBidder: string;
      highestBiddersPK: string;
      status: number;
      hash: string;
      dscHash: string;
      cid: string;
      endBlock: BigNumber;
      payWindow: BigNumber;
      startPrice: BigNumber;
      dealIndex: BigNumber;
    }
  >;

  defaultOnPayment(
    dealId: BigNumberish,
    overrides?: Overrides & { from?: string }
  ): Promise<ContractTransaction>;

  getApproved(
    tokenId: BigNumberish,
    overrides?: CallOverrides
  ): Promise<string>;

  getDealsLenght(overrides?: CallOverrides): Promise<BigNumber>;

  getPendingBid(
    dealId: BigNumberish,
    bidIndex: BigNumberish,
    overrides?: CallOverrides
  ): Promise<[string, BigNumber, string]>;

  isApprovedForAll(
    owner: string,
    operator: string,
    overrides?: CallOverrides
  ): Promise<boolean>;

  name(overrides?: CallOverrides): Promise<string>;

  owner(overrides?: CallOverrides): Promise<string>;

  ownerOf(tokenId: BigNumberish, overrides?: CallOverrides): Promise<string>;

  "safeTransferFrom(address,address,uint256)"(
    from: string,
    to: string,
    tokenId: BigNumberish,
    overrides?: Overrides & { from?: string }
  ): Promise<ContractTransaction>;

  "safeTransferFrom(address,address,uint256,bytes)"(
    from: string,
    to: string,
    tokenId: BigNumberish,
    data: BytesLike,
    overrides?: Overrides & { from?: string }
  ): Promise<ContractTransaction>;

  scores(
    arg0: string,
    overrides?: CallOverrides
  ): Promise<
    [BigNumber, BigNumber] & { score: BigNumber; reviewNum: BigNumber }
  >;

  setApprovalForAll(
    operator: string,
    approved: boolean,
    overrides?: Overrides & { from?: string }
  ): Promise<ContractTransaction>;

  submitCID(
    dealId: BigNumberish,
    cid: string,
    overrides?: Overrides & { from?: string }
  ): Promise<ContractTransaction>;

  supportsInterface(
    interfaceId: BytesLike,
    overrides?: CallOverrides
  ): Promise<boolean>;

  symbol(overrides?: CallOverrides): Promise<string>;

  tokenURI(tokenId: BigNumberish, overrides?: CallOverrides): Promise<string>;

  transferFrom(
    from: string,
    to: string,
    tokenId: BigNumberish,
    overrides?: Overrides & { from?: string }
  ): Promise<ContractTransaction>;

  callStatic: {
    addReview(
      _addr: string,
      _score: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    approve(
      to: string,
      tokenId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    balanceOf(owner: string, overrides?: CallOverrides): Promise<BigNumber>;

    bid(
      dealId: BigNumberish,
      bidAmount: BigNumberish,
      _pk: string,
      overrides?: CallOverrides
    ): Promise<void>;

    closeBidding(
      dealId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    collectFunds(overrides?: CallOverrides): Promise<void>;

    confirmPayment(
      dealId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    createDeal(
      _hash: string,
      _dscHash: string,
      _startPrice: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    dealIdByHash(arg0: string, overrides?: CallOverrides): Promise<BigNumber>;

    dealIndex(overrides?: CallOverrides): Promise<BigNumber>;

    deals(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<
      [
        string,
        BigNumber,
        string,
        string,
        number,
        string,
        string,
        string,
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber
      ] & {
        seller: string;
        highestBid: BigNumber;
        highestBidder: string;
        highestBiddersPK: string;
        status: number;
        hash: string;
        dscHash: string;
        cid: string;
        endBlock: BigNumber;
        payWindow: BigNumber;
        startPrice: BigNumber;
        dealIndex: BigNumber;
      }
    >;

    defaultOnPayment(
      dealId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    getApproved(
      tokenId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<string>;

    getDealsLenght(overrides?: CallOverrides): Promise<BigNumber>;

    getPendingBid(
      dealId: BigNumberish,
      bidIndex: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[string, BigNumber, string]>;

    isApprovedForAll(
      owner: string,
      operator: string,
      overrides?: CallOverrides
    ): Promise<boolean>;

    name(overrides?: CallOverrides): Promise<string>;

    owner(overrides?: CallOverrides): Promise<string>;

    ownerOf(tokenId: BigNumberish, overrides?: CallOverrides): Promise<string>;

    "safeTransferFrom(address,address,uint256)"(
      from: string,
      to: string,
      tokenId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    "safeTransferFrom(address,address,uint256,bytes)"(
      from: string,
      to: string,
      tokenId: BigNumberish,
      data: BytesLike,
      overrides?: CallOverrides
    ): Promise<void>;

    scores(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<
      [BigNumber, BigNumber] & { score: BigNumber; reviewNum: BigNumber }
    >;

    setApprovalForAll(
      operator: string,
      approved: boolean,
      overrides?: CallOverrides
    ): Promise<void>;

    submitCID(
      dealId: BigNumberish,
      cid: string,
      overrides?: CallOverrides
    ): Promise<void>;

    supportsInterface(
      interfaceId: BytesLike,
      overrides?: CallOverrides
    ): Promise<boolean>;

    symbol(overrides?: CallOverrides): Promise<string>;

    tokenURI(tokenId: BigNumberish, overrides?: CallOverrides): Promise<string>;

    transferFrom(
      from: string,
      to: string,
      tokenId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;
  };

  filters: {
    "Approval(address,address,uint256)"(
      owner?: string | null,
      approved?: string | null,
      tokenId?: BigNumberish | null
    ): ApprovalEventFilter;
    Approval(
      owner?: string | null,
      approved?: string | null,
      tokenId?: BigNumberish | null
    ): ApprovalEventFilter;

    "ApprovalForAll(address,address,bool)"(
      owner?: string | null,
      operator?: string | null,
      approved?: null
    ): ApprovalForAllEventFilter;
    ApprovalForAll(
      owner?: string | null,
      operator?: string | null,
      approved?: null
    ): ApprovalForAllEventFilter;

    "Transfer(address,address,uint256)"(
      from?: string | null,
      to?: string | null,
      tokenId?: BigNumberish | null
    ): TransferEventFilter;
    Transfer(
      from?: string | null,
      to?: string | null,
      tokenId?: BigNumberish | null
    ): TransferEventFilter;
  };

  estimateGas: {
    addReview(
      _addr: string,
      _score: BigNumberish,
      overrides?: PayableOverrides & { from?: string }
    ): Promise<BigNumber>;

    approve(
      to: string,
      tokenId: BigNumberish,
      overrides?: Overrides & { from?: string }
    ): Promise<BigNumber>;

    balanceOf(owner: string, overrides?: CallOverrides): Promise<BigNumber>;

    bid(
      dealId: BigNumberish,
      bidAmount: BigNumberish,
      _pk: string,
      overrides?: PayableOverrides & { from?: string }
    ): Promise<BigNumber>;

    closeBidding(
      dealId: BigNumberish,
      overrides?: Overrides & { from?: string }
    ): Promise<BigNumber>;

    collectFunds(overrides?: Overrides & { from?: string }): Promise<BigNumber>;

    confirmPayment(
      dealId: BigNumberish,
      overrides?: PayableOverrides & { from?: string }
    ): Promise<BigNumber>;

    createDeal(
      _hash: string,
      _dscHash: string,
      _startPrice: BigNumberish,
      overrides?: Overrides & { from?: string }
    ): Promise<BigNumber>;

    dealIdByHash(arg0: string, overrides?: CallOverrides): Promise<BigNumber>;

    dealIndex(overrides?: CallOverrides): Promise<BigNumber>;

    deals(arg0: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;

    defaultOnPayment(
      dealId: BigNumberish,
      overrides?: Overrides & { from?: string }
    ): Promise<BigNumber>;

    getApproved(
      tokenId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getDealsLenght(overrides?: CallOverrides): Promise<BigNumber>;

    getPendingBid(
      dealId: BigNumberish,
      bidIndex: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    isApprovedForAll(
      owner: string,
      operator: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    name(overrides?: CallOverrides): Promise<BigNumber>;

    owner(overrides?: CallOverrides): Promise<BigNumber>;

    ownerOf(
      tokenId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    "safeTransferFrom(address,address,uint256)"(
      from: string,
      to: string,
      tokenId: BigNumberish,
      overrides?: Overrides & { from?: string }
    ): Promise<BigNumber>;

    "safeTransferFrom(address,address,uint256,bytes)"(
      from: string,
      to: string,
      tokenId: BigNumberish,
      data: BytesLike,
      overrides?: Overrides & { from?: string }
    ): Promise<BigNumber>;

    scores(arg0: string, overrides?: CallOverrides): Promise<BigNumber>;

    setApprovalForAll(
      operator: string,
      approved: boolean,
      overrides?: Overrides & { from?: string }
    ): Promise<BigNumber>;

    submitCID(
      dealId: BigNumberish,
      cid: string,
      overrides?: Overrides & { from?: string }
    ): Promise<BigNumber>;

    supportsInterface(
      interfaceId: BytesLike,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    symbol(overrides?: CallOverrides): Promise<BigNumber>;

    tokenURI(
      tokenId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    transferFrom(
      from: string,
      to: string,
      tokenId: BigNumberish,
      overrides?: Overrides & { from?: string }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    addReview(
      _addr: string,
      _score: BigNumberish,
      overrides?: PayableOverrides & { from?: string }
    ): Promise<PopulatedTransaction>;

    approve(
      to: string,
      tokenId: BigNumberish,
      overrides?: Overrides & { from?: string }
    ): Promise<PopulatedTransaction>;

    balanceOf(
      owner: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    bid(
      dealId: BigNumberish,
      bidAmount: BigNumberish,
      _pk: string,
      overrides?: PayableOverrides & { from?: string }
    ): Promise<PopulatedTransaction>;

    closeBidding(
      dealId: BigNumberish,
      overrides?: Overrides & { from?: string }
    ): Promise<PopulatedTransaction>;

    collectFunds(
      overrides?: Overrides & { from?: string }
    ): Promise<PopulatedTransaction>;

    confirmPayment(
      dealId: BigNumberish,
      overrides?: PayableOverrides & { from?: string }
    ): Promise<PopulatedTransaction>;

    createDeal(
      _hash: string,
      _dscHash: string,
      _startPrice: BigNumberish,
      overrides?: Overrides & { from?: string }
    ): Promise<PopulatedTransaction>;

    dealIdByHash(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    dealIndex(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    deals(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    defaultOnPayment(
      dealId: BigNumberish,
      overrides?: Overrides & { from?: string }
    ): Promise<PopulatedTransaction>;

    getApproved(
      tokenId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getDealsLenght(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    getPendingBid(
      dealId: BigNumberish,
      bidIndex: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    isApprovedForAll(
      owner: string,
      operator: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    name(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    owner(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    ownerOf(
      tokenId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    "safeTransferFrom(address,address,uint256)"(
      from: string,
      to: string,
      tokenId: BigNumberish,
      overrides?: Overrides & { from?: string }
    ): Promise<PopulatedTransaction>;

    "safeTransferFrom(address,address,uint256,bytes)"(
      from: string,
      to: string,
      tokenId: BigNumberish,
      data: BytesLike,
      overrides?: Overrides & { from?: string }
    ): Promise<PopulatedTransaction>;

    scores(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    setApprovalForAll(
      operator: string,
      approved: boolean,
      overrides?: Overrides & { from?: string }
    ): Promise<PopulatedTransaction>;

    submitCID(
      dealId: BigNumberish,
      cid: string,
      overrides?: Overrides & { from?: string }
    ): Promise<PopulatedTransaction>;

    supportsInterface(
      interfaceId: BytesLike,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    symbol(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    tokenURI(
      tokenId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    transferFrom(
      from: string,
      to: string,
      tokenId: BigNumberish,
      overrides?: Overrides & { from?: string }
    ): Promise<PopulatedTransaction>;
  };
}
