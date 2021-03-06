import { Writer, Reader } from "as-proto";
import { common } from "./common";
import { protocol } from "./protocol";

export namespace chain {
  export class object_space {
    static encode(message: object_space, writer: Writer): void {
      writer.uint32(8);
      writer.bool(message.system);

      const zone = message.zone;
      if (zone !== null) {
        writer.uint32(18);
        writer.bytes(zone);
      }

      writer.uint32(24);
      writer.uint32(message.id);
    }

    static decode(reader: Reader, length: i32): object_space {
      const end: usize = length < 0 ? reader.end : reader.ptr + length;
      const message = new object_space();

      while (reader.ptr < end) {
        const tag = reader.uint32();
        switch (tag >>> 3) {
          case 1:
            message.system = reader.bool();
            break;

          case 2:
            message.zone = reader.bytes();
            break;

          case 3:
            message.id = reader.uint32();
            break;

          default:
            reader.skipType(tag & 7);
            break;
        }
      }

      return message;
    }

    system: bool;
    zone: Uint8Array | null;
    id: u32;

    constructor(
      system: bool = false,
      zone: Uint8Array | null = null,
      id: u32 = 0
    ) {
      this.system = system;
      this.zone = zone;
      this.id = id;
    }
  }

  export class head_info {
    static encode(message: head_info, writer: Writer): void {
      const head_topology = message.head_topology;
      if (head_topology !== null) {
        writer.uint32(10);
        writer.fork();
        common.block_topology.encode(head_topology, writer);
        writer.ldelim();
      }

      writer.uint32(16);
      writer.uint64(message.head_block_time);

      writer.uint32(24);
      writer.uint64(message.last_irreversible_block);
    }

    static decode(reader: Reader, length: i32): head_info {
      const end: usize = length < 0 ? reader.end : reader.ptr + length;
      const message = new head_info();

      while (reader.ptr < end) {
        const tag = reader.uint32();
        switch (tag >>> 3) {
          case 1:
            message.head_topology = common.block_topology.decode(
              reader,
              reader.uint32()
            );
            break;

          case 2:
            message.head_block_time = reader.uint64();
            break;

          case 3:
            message.last_irreversible_block = reader.uint64();
            break;

          default:
            reader.skipType(tag & 7);
            break;
        }
      }

      return message;
    }

    head_topology: common.block_topology | null;
    head_block_time: u64;
    last_irreversible_block: u64;

    constructor(
      head_topology: common.block_topology | null = null,
      head_block_time: u64 = 0,
      last_irreversible_block: u64 = 0
    ) {
      this.head_topology = head_topology;
      this.head_block_time = head_block_time;
      this.last_irreversible_block = last_irreversible_block;
    }
  }

  export class caller_data {
    static encode(message: caller_data, writer: Writer): void {
      const caller = message.caller;
      if (caller !== null) {
        writer.uint32(10);
        writer.bytes(caller);
      }

      writer.uint32(16);
      writer.int32(message.caller_privilege);
    }

    static decode(reader: Reader, length: i32): caller_data {
      const end: usize = length < 0 ? reader.end : reader.ptr + length;
      const message = new caller_data();

      while (reader.ptr < end) {
        const tag = reader.uint32();
        switch (tag >>> 3) {
          case 1:
            message.caller = reader.bytes();
            break;

          case 2:
            message.caller_privilege = reader.int32();
            break;

          default:
            reader.skipType(tag & 7);
            break;
        }
      }

      return message;
    }

    caller: Uint8Array | null;
    caller_privilege: chain.privilege;

    constructor(
      caller: Uint8Array | null = null,
      caller_privilege: chain.privilege = 0
    ) {
      this.caller = caller;
      this.caller_privilege = caller_privilege;
    }
  }

  @unmanaged
  export class resource_limit_data {
    static encode(message: resource_limit_data, writer: Writer): void {
      writer.uint32(8);
      writer.uint64(message.disk_storage_limit);

      writer.uint32(16);
      writer.uint64(message.disk_storage_cost);

      writer.uint32(24);
      writer.uint64(message.network_bandwidth_limit);

      writer.uint32(32);
      writer.uint64(message.network_bandwidth_cost);

      writer.uint32(40);
      writer.uint64(message.compute_bandwidth_limit);

      writer.uint32(48);
      writer.uint64(message.compute_bandwidth_cost);
    }

    static decode(reader: Reader, length: i32): resource_limit_data {
      const end: usize = length < 0 ? reader.end : reader.ptr + length;
      const message = new resource_limit_data();

      while (reader.ptr < end) {
        const tag = reader.uint32();
        switch (tag >>> 3) {
          case 1:
            message.disk_storage_limit = reader.uint64();
            break;

          case 2:
            message.disk_storage_cost = reader.uint64();
            break;

          case 3:
            message.network_bandwidth_limit = reader.uint64();
            break;

          case 4:
            message.network_bandwidth_cost = reader.uint64();
            break;

          case 5:
            message.compute_bandwidth_limit = reader.uint64();
            break;

          case 6:
            message.compute_bandwidth_cost = reader.uint64();
            break;

          default:
            reader.skipType(tag & 7);
            break;
        }
      }

      return message;
    }

    disk_storage_limit: u64;
    disk_storage_cost: u64;
    network_bandwidth_limit: u64;
    network_bandwidth_cost: u64;
    compute_bandwidth_limit: u64;
    compute_bandwidth_cost: u64;

    constructor(
      disk_storage_limit: u64 = 0,
      disk_storage_cost: u64 = 0,
      network_bandwidth_limit: u64 = 0,
      network_bandwidth_cost: u64 = 0,
      compute_bandwidth_limit: u64 = 0,
      compute_bandwidth_cost: u64 = 0
    ) {
      this.disk_storage_limit = disk_storage_limit;
      this.disk_storage_cost = disk_storage_cost;
      this.network_bandwidth_limit = network_bandwidth_limit;
      this.network_bandwidth_cost = network_bandwidth_cost;
      this.compute_bandwidth_limit = compute_bandwidth_limit;
      this.compute_bandwidth_cost = compute_bandwidth_cost;
    }
  }

  export class prints_arguments {
    static encode(message: prints_arguments, writer: Writer): void {
      const message_2 = message.message;
      if (message_2 !== null) {
        writer.uint32(10);
        writer.string(message_2);
      }
    }

    static decode(reader: Reader, length: i32): prints_arguments {
      const end: usize = length < 0 ? reader.end : reader.ptr + length;
      const message = new prints_arguments();

      while (reader.ptr < end) {
        const tag = reader.uint32();
        switch (tag >>> 3) {
          case 1:
            message.message = reader.string();
            break;

          default:
            reader.skipType(tag & 7);
            break;
        }
      }

      return message;
    }

    message: string | null;

    constructor(message: string | null = null) {
      this.message = message;
    }
  }

  @unmanaged
  export class prints_result {
    static encode(message: prints_result, writer: Writer): void { }

    static decode(reader: Reader, length: i32): prints_result {
      const end: usize = length < 0 ? reader.end : reader.ptr + length;
      const message = new prints_result();

      while (reader.ptr < end) {
        const tag = reader.uint32();
        switch (tag >>> 3) {
          default:
            reader.skipType(tag & 7);
            break;
        }
      }

      return message;
    }

    constructor() { }
  }

  export class verify_block_signature_arguments {
    static encode(
      message: verify_block_signature_arguments,
      writer: Writer
    ): void {
      const digest = message.digest;
      if (digest !== null) {
        writer.uint32(10);
        writer.bytes(digest);
      }

      const active = message.active;
      if (active !== null) {
        writer.uint32(18);
        writer.bytes(active);
      }

      const signature_data = message.signature_data;
      if (signature_data !== null) {
        writer.uint32(26);
        writer.bytes(signature_data);
      }
    }

    static decode(
      reader: Reader,
      length: i32
    ): verify_block_signature_arguments {
      const end: usize = length < 0 ? reader.end : reader.ptr + length;
      const message = new verify_block_signature_arguments();

      while (reader.ptr < end) {
        const tag = reader.uint32();
        switch (tag >>> 3) {
          case 1:
            message.digest = reader.bytes();
            break;

          case 2:
            message.active = reader.bytes();
            break;

          case 3:
            message.signature_data = reader.bytes();
            break;

          default:
            reader.skipType(tag & 7);
            break;
        }
      }

      return message;
    }

    digest: Uint8Array | null;
    active: Uint8Array | null;
    signature_data: Uint8Array | null;

    constructor(
      digest: Uint8Array | null = null,
      active: Uint8Array | null = null,
      signature_data: Uint8Array | null = null
    ) {
      this.digest = digest;
      this.active = active;
      this.signature_data = signature_data;
    }
  }

  @unmanaged
  export class verify_block_signature_result {
    static encode(
      message: verify_block_signature_result,
      writer: Writer
    ): void {
      writer.uint32(8);
      writer.bool(message.value);
    }

    static decode(
      reader: Reader,
      length: i32
    ): verify_block_signature_result {
      const end: usize = length < 0 ? reader.end : reader.ptr + length;
      const message = new verify_block_signature_result();

      while (reader.ptr < end) {
        const tag = reader.uint32();
        switch (tag >>> 3) {
          case 1:
            message.value = reader.bool();
            break;

          default:
            reader.skipType(tag & 7);
            break;
        }
      }

      return message;
    }

    value: bool;

    constructor(value: bool = false) {
      this.value = value;
    }
  }

  export class verify_merkle_root_arguments {
    static encode(
      message: verify_merkle_root_arguments,
      writer: Writer
    ): void {
      const root = message.root;
      if (root !== null) {
        writer.uint32(10);
        writer.bytes(root);
      }

      const hashes = message.hashes;
      if (hashes.length !== 0) {
        writer.uint32(18);
        writer.fork();
        for (let i = 0; i < hashes.length; ++i) {
          writer.bytes(hashes[i]);
        }
        writer.ldelim();
      }
    }

    static decode(reader: Reader, length: i32): verify_merkle_root_arguments {
      const end: usize = length < 0 ? reader.end : reader.ptr + length;
      const message = new verify_merkle_root_arguments();

      while (reader.ptr < end) {
        const tag = reader.uint32();
        switch (tag >>> 3) {
          case 1:
            message.root = reader.bytes();
            break;

          case 2:
            if ((tag & 7) === 2) {
              const repeatedEnd: usize = reader.ptr + reader.uint32();
              while (reader.ptr < repeatedEnd) {
                message.hashes.push(reader.bytes());
              }
            } else {
              message.hashes.push(reader.bytes());
            }
            break;

          default:
            reader.skipType(tag & 7);
            break;
        }
      }

      return message;
    }

    root: Uint8Array | null;
    hashes: Array<Uint8Array>;

    constructor(
      root: Uint8Array | null = null,
      hashes: Array<Uint8Array> = []
    ) {
      this.root = root;
      this.hashes = hashes;
    }
  }

  @unmanaged
  export class verify_merkle_root_result {
    static encode(message: verify_merkle_root_result, writer: Writer): void {
      writer.uint32(8);
      writer.bool(message.value);
    }

    static decode(reader: Reader, length: i32): verify_merkle_root_result {
      const end: usize = length < 0 ? reader.end : reader.ptr + length;
      const message = new verify_merkle_root_result();

      while (reader.ptr < end) {
        const tag = reader.uint32();
        switch (tag >>> 3) {
          case 1:
            message.value = reader.bool();
            break;

          default:
            reader.skipType(tag & 7);
            break;
        }
      }

      return message;
    }

    value: bool;

    constructor(value: bool = false) {
      this.value = value;
    }
  }

  export class apply_block_arguments {
    static encode(message: apply_block_arguments, writer: Writer): void {
      const block = message.block;
      if (block !== null) {
        writer.uint32(10);
        writer.fork();
        protocol.block.encode(block, writer);
        writer.ldelim();
      }

      writer.uint32(16);
      writer.bool(message.check_passive_data);

      writer.uint32(24);
      writer.bool(message.check_block_signature);

      writer.uint32(32);
      writer.bool(message.check_transaction_signature);
    }

    static decode(reader: Reader, length: i32): apply_block_arguments {
      const end: usize = length < 0 ? reader.end : reader.ptr + length;
      const message = new apply_block_arguments();

      while (reader.ptr < end) {
        const tag = reader.uint32();
        switch (tag >>> 3) {
          case 1:
            message.block = protocol.block.decode(
              reader,
              reader.uint32()
            );
            break;

          case 2:
            message.check_passive_data = reader.bool();
            break;

          case 3:
            message.check_block_signature = reader.bool();
            break;

          case 4:
            message.check_transaction_signature = reader.bool();
            break;

          default:
            reader.skipType(tag & 7);
            break;
        }
      }

      return message;
    }

    block: protocol.block | null;
    check_passive_data: bool;
    check_block_signature: bool;
    check_transaction_signature: bool;

    constructor(
      block: protocol.block | null = null,
      check_passive_data: bool = false,
      check_block_signature: bool = false,
      check_transaction_signature: bool = false
    ) {
      this.block = block;
      this.check_passive_data = check_passive_data;
      this.check_block_signature = check_block_signature;
      this.check_transaction_signature = check_transaction_signature;
    }
  }

  @unmanaged
  export class apply_block_result {
    static encode(message: apply_block_result, writer: Writer): void { }

    static decode(reader: Reader, length: i32): apply_block_result {
      const end: usize = length < 0 ? reader.end : reader.ptr + length;
      const message = new apply_block_result();

      while (reader.ptr < end) {
        const tag = reader.uint32();
        switch (tag >>> 3) {
          default:
            reader.skipType(tag & 7);
            break;
        }
      }

      return message;
    }

    constructor() { }
  }

  export class apply_transaction_arguments {
    static encode(
      message: apply_transaction_arguments,
      writer: Writer
    ): void {
      const transaction = message.transaction;
      if (transaction !== null) {
        writer.uint32(10);
        writer.fork();
        protocol.transaction.encode(transaction, writer);
        writer.ldelim();
      }
    }

    static decode(reader: Reader, length: i32): apply_transaction_arguments {
      const end: usize = length < 0 ? reader.end : reader.ptr + length;
      const message = new apply_transaction_arguments();

      while (reader.ptr < end) {
        const tag = reader.uint32();
        switch (tag >>> 3) {
          case 1:
            message.transaction = protocol.transaction.decode(
              reader,
              reader.uint32()
            );
            break;

          default:
            reader.skipType(tag & 7);
            break;
        }
      }

      return message;
    }

    transaction: protocol.transaction | null;

    constructor(transaction: protocol.transaction | null = null) {
      this.transaction = transaction;
    }
  }

  @unmanaged
  export class apply_transaction_result {
    static encode(message: apply_transaction_result, writer: Writer): void { }

    static decode(reader: Reader, length: i32): apply_transaction_result {
      const end: usize = length < 0 ? reader.end : reader.ptr + length;
      const message = new apply_transaction_result();

      while (reader.ptr < end) {
        const tag = reader.uint32();
        switch (tag >>> 3) {
          default:
            reader.skipType(tag & 7);
            break;
        }
      }

      return message;
    }

    constructor() { }
  }

  export class apply_upload_contract_operation_arguments {
    static encode(
      message: apply_upload_contract_operation_arguments,
      writer: Writer
    ): void {
      const op = message.op;
      if (op !== null) {
        writer.uint32(10);
        writer.fork();
        protocol.upload_contract_operation.encode(op, writer);
        writer.ldelim();
      }
    }

    static decode(
      reader: Reader,
      length: i32
    ): apply_upload_contract_operation_arguments {
      const end: usize = length < 0 ? reader.end : reader.ptr + length;
      const message = new apply_upload_contract_operation_arguments();

      while (reader.ptr < end) {
        const tag = reader.uint32();
        switch (tag >>> 3) {
          case 1:
            message.op = protocol.upload_contract_operation.decode(
              reader,
              reader.uint32()
            );
            break;

          default:
            reader.skipType(tag & 7);
            break;
        }
      }

      return message;
    }

    op: protocol.upload_contract_operation | null;

    constructor(
      op: protocol.upload_contract_operation | null = null
    ) {
      this.op = op;
    }
  }

  @unmanaged
  export class apply_upload_contract_operation_result {
    static encode(
      message: apply_upload_contract_operation_result,
      writer: Writer
    ): void { }

    static decode(
      reader: Reader,
      length: i32
    ): apply_upload_contract_operation_result {
      const end: usize = length < 0 ? reader.end : reader.ptr + length;
      const message = new apply_upload_contract_operation_result();

      while (reader.ptr < end) {
        const tag = reader.uint32();
        switch (tag >>> 3) {
          default:
            reader.skipType(tag & 7);
            break;
        }
      }

      return message;
    }

    constructor() { }
  }

  export class apply_call_contract_operation_arguments {
    static encode(
      message: apply_call_contract_operation_arguments,
      writer: Writer
    ): void {
      const op = message.op;
      if (op !== null) {
        writer.uint32(10);
        writer.fork();
        protocol.call_contract_operation.encode(op, writer);
        writer.ldelim();
      }
    }

    static decode(
      reader: Reader,
      length: i32
    ): apply_call_contract_operation_arguments {
      const end: usize = length < 0 ? reader.end : reader.ptr + length;
      const message = new apply_call_contract_operation_arguments();

      while (reader.ptr < end) {
        const tag = reader.uint32();
        switch (tag >>> 3) {
          case 1:
            message.op = protocol.call_contract_operation.decode(
              reader,
              reader.uint32()
            );
            break;

          default:
            reader.skipType(tag & 7);
            break;
        }
      }

      return message;
    }

    op: protocol.call_contract_operation | null;

    constructor(op: protocol.call_contract_operation | null = null) {
      this.op = op;
    }
  }

  @unmanaged
  export class apply_call_contract_operation_result {
    static encode(
      message: apply_call_contract_operation_result,
      writer: Writer
    ): void { }

    static decode(
      reader: Reader,
      length: i32
    ): apply_call_contract_operation_result {
      const end: usize = length < 0 ? reader.end : reader.ptr + length;
      const message = new apply_call_contract_operation_result();

      while (reader.ptr < end) {
        const tag = reader.uint32();
        switch (tag >>> 3) {
          default:
            reader.skipType(tag & 7);
            break;
        }
      }

      return message;
    }

    constructor() { }
  }

  export class apply_set_system_call_operation_arguments {
    static encode(
      message: apply_set_system_call_operation_arguments,
      writer: Writer
    ): void {
      const op = message.op;
      if (op !== null) {
        writer.uint32(10);
        writer.fork();
        protocol.set_system_call_operation.encode(op, writer);
        writer.ldelim();
      }
    }

    static decode(
      reader: Reader,
      length: i32
    ): apply_set_system_call_operation_arguments {
      const end: usize = length < 0 ? reader.end : reader.ptr + length;
      const message = new apply_set_system_call_operation_arguments();

      while (reader.ptr < end) {
        const tag = reader.uint32();
        switch (tag >>> 3) {
          case 1:
            message.op = protocol.set_system_call_operation.decode(
              reader,
              reader.uint32()
            );
            break;

          default:
            reader.skipType(tag & 7);
            break;
        }
      }

      return message;
    }

    op: protocol.set_system_call_operation | null;

    constructor(
      op: protocol.set_system_call_operation | null = null
    ) {
      this.op = op;
    }
  }

  @unmanaged
  export class apply_set_system_call_operation_result {
    static encode(
      message: apply_set_system_call_operation_result,
      writer: Writer
    ): void { }

    static decode(
      reader: Reader,
      length: i32
    ): apply_set_system_call_operation_result {
      const end: usize = length < 0 ? reader.end : reader.ptr + length;
      const message = new apply_set_system_call_operation_result();

      while (reader.ptr < end) {
        const tag = reader.uint32();
        switch (tag >>> 3) {
          default:
            reader.skipType(tag & 7);
            break;
        }
      }

      return message;
    }

    constructor() { }
  }

  export class put_object_arguments {
    static encode(message: put_object_arguments, writer: Writer): void {
      const space = message.space;
      if (space !== null) {
        writer.uint32(10);
        writer.fork();
        chain.object_space.encode(space, writer);
        writer.ldelim();
      }

      const key = message.key;
      if (key !== null) {
        writer.uint32(18);
        writer.bytes(key);
      }

      const obj = message.obj;
      if (obj !== null) {
        writer.uint32(26);
        writer.bytes(obj);
      }
    }

    static decode(reader: Reader, length: i32): put_object_arguments {
      const end: usize = length < 0 ? reader.end : reader.ptr + length;
      const message = new put_object_arguments();

      while (reader.ptr < end) {
        const tag = reader.uint32();
        switch (tag >>> 3) {
          case 1:
            message.space = chain.object_space.decode(
              reader,
              reader.uint32()
            );
            break;

          case 2:
            message.key = reader.bytes();
            break;

          case 3:
            message.obj = reader.bytes();
            break;

          default:
            reader.skipType(tag & 7);
            break;
        }
      }

      return message;
    }

    space: chain.object_space | null;
    key: Uint8Array | null;
    obj: Uint8Array | null;

    constructor(
      space: chain.object_space | null = null,
      key: Uint8Array | null = null,
      obj: Uint8Array | null = null
    ) {
      this.space = space;
      this.key = key;
      this.obj = obj;
    }
  }

  @unmanaged
  export class put_object_result {
    static encode(message: put_object_result, writer: Writer): void {
      writer.uint32(8);
      writer.bool(message.value);
    }

    static decode(reader: Reader, length: i32): put_object_result {
      const end: usize = length < 0 ? reader.end : reader.ptr + length;
      const message = new put_object_result();

      while (reader.ptr < end) {
        const tag = reader.uint32();
        switch (tag >>> 3) {
          case 1:
            message.value = reader.bool();
            break;

          default:
            reader.skipType(tag & 7);
            break;
        }
      }

      return message;
    }

    value: bool;

    constructor(value: bool = false) {
      this.value = value;
    }
  }

  export class get_object_arguments {
    static encode(message: get_object_arguments, writer: Writer): void {
      const space = message.space;
      if (space !== null) {
        writer.uint32(10);
        writer.fork();
        chain.object_space.encode(space, writer);
        writer.ldelim();
      }

      const key = message.key;
      if (key !== null) {
        writer.uint32(18);
        writer.bytes(key);
      }

      writer.uint32(24);
      writer.uint32(message.object_size_hint);
    }

    static decode(reader: Reader, length: i32): get_object_arguments {
      const end: usize = length < 0 ? reader.end : reader.ptr + length;
      const message = new get_object_arguments();

      while (reader.ptr < end) {
        const tag = reader.uint32();
        switch (tag >>> 3) {
          case 1:
            message.space = chain.object_space.decode(
              reader,
              reader.uint32()
            );
            break;

          case 2:
            message.key = reader.bytes();
            break;

          case 3:
            message.object_size_hint = reader.uint32();
            break;

          default:
            reader.skipType(tag & 7);
            break;
        }
      }

      return message;
    }

    space: chain.object_space | null;
    key: Uint8Array | null;
    object_size_hint: u32;

    constructor(
      space: chain.object_space | null = null,
      key: Uint8Array | null = null,
      object_size_hint: u32 = 0
    ) {
      this.space = space;
      this.key = key;
      this.object_size_hint = object_size_hint;
    }
  }

  export class get_object_result {
    static encode(message: get_object_result, writer: Writer): void {
      const value = message.value;
      if (value !== null) {
        writer.uint32(26);
        writer.bytes(value);
      }
    }

    static decode(reader: Reader, length: i32): get_object_result {
      const end: usize = length < 0 ? reader.end : reader.ptr + length;
      const message = new get_object_result();

      while (reader.ptr < end) {
        const tag = reader.uint32();
        switch (tag >>> 3) {
          case 3:
            message.value = reader.bytes();
            break;

          default:
            reader.skipType(tag & 7);
            break;
        }
      }

      return message;
    }

    value: Uint8Array | null;

    constructor(value: Uint8Array | null = null) {
      this.value = value;
    }
  }

  export class get_next_object_arguments {
    static encode(message: get_next_object_arguments, writer: Writer): void {
      const space = message.space;
      if (space !== null) {
        writer.uint32(10);
        writer.fork();
        chain.object_space.encode(space, writer);
        writer.ldelim();
      }

      const key = message.key;
      if (key !== null) {
        writer.uint32(18);
        writer.bytes(key);
      }

      writer.uint32(24);
      writer.uint32(message.object_size_hint);
    }

    static decode(reader: Reader, length: i32): get_next_object_arguments {
      const end: usize = length < 0 ? reader.end : reader.ptr + length;
      const message = new get_next_object_arguments();

      while (reader.ptr < end) {
        const tag = reader.uint32();
        switch (tag >>> 3) {
          case 1:
            message.space = chain.object_space.decode(
              reader,
              reader.uint32()
            );
            break;

          case 2:
            message.key = reader.bytes();
            break;

          case 3:
            message.object_size_hint = reader.uint32();
            break;

          default:
            reader.skipType(tag & 7);
            break;
        }
      }

      return message;
    }

    space: chain.object_space | null;
    key: Uint8Array | null;
    object_size_hint: u32;

    constructor(
      space: chain.object_space | null = null,
      key: Uint8Array | null = null,
      object_size_hint: u32 = 0
    ) {
      this.space = space;
      this.key = key;
      this.object_size_hint = object_size_hint;
    }
  }

  export class get_next_object_result {
    static encode(message: get_next_object_result, writer: Writer): void {
      const value = message.value;
      if (value !== null) {
        writer.uint32(26);
        writer.bytes(value);
      }
    }

    static decode(reader: Reader, length: i32): get_next_object_result {
      const end: usize = length < 0 ? reader.end : reader.ptr + length;
      const message = new get_next_object_result();

      while (reader.ptr < end) {
        const tag = reader.uint32();
        switch (tag >>> 3) {
          case 3:
            message.value = reader.bytes();
            break;

          default:
            reader.skipType(tag & 7);
            break;
        }
      }

      return message;
    }

    value: Uint8Array | null;

    constructor(value: Uint8Array | null = null) {
      this.value = value;
    }
  }

  export class get_prev_object_arguments {
    static encode(message: get_prev_object_arguments, writer: Writer): void {
      const space = message.space;
      if (space !== null) {
        writer.uint32(10);
        writer.fork();
        chain.object_space.encode(space, writer);
        writer.ldelim();
      }

      const key = message.key;
      if (key !== null) {
        writer.uint32(18);
        writer.bytes(key);
      }

      writer.uint32(24);
      writer.uint32(message.object_size_hint);
    }

    static decode(reader: Reader, length: i32): get_prev_object_arguments {
      const end: usize = length < 0 ? reader.end : reader.ptr + length;
      const message = new get_prev_object_arguments();

      while (reader.ptr < end) {
        const tag = reader.uint32();
        switch (tag >>> 3) {
          case 1:
            message.space = chain.object_space.decode(
              reader,
              reader.uint32()
            );
            break;

          case 2:
            message.key = reader.bytes();
            break;

          case 3:
            message.object_size_hint = reader.uint32();
            break;

          default:
            reader.skipType(tag & 7);
            break;
        }
      }

      return message;
    }

    space: chain.object_space | null;
    key: Uint8Array | null;
    object_size_hint: u32;

    constructor(
      space: chain.object_space | null = null,
      key: Uint8Array | null = null,
      object_size_hint: u32 = 0
    ) {
      this.space = space;
      this.key = key;
      this.object_size_hint = object_size_hint;
    }
  }

  export class get_prev_object_result {
    static encode(message: get_prev_object_result, writer: Writer): void {
      const value = message.value;
      if (value !== null) {
        writer.uint32(26);
        writer.bytes(value);
      }
    }

    static decode(reader: Reader, length: i32): get_prev_object_result {
      const end: usize = length < 0 ? reader.end : reader.ptr + length;
      const message = new get_prev_object_result();

      while (reader.ptr < end) {
        const tag = reader.uint32();
        switch (tag >>> 3) {
          case 3:
            message.value = reader.bytes();
            break;

          default:
            reader.skipType(tag & 7);
            break;
        }
      }

      return message;
    }

    value: Uint8Array | null;

    constructor(value: Uint8Array | null = null) {
      this.value = value;
    }
  }

  export class call_contract_arguments {
    static encode(message: call_contract_arguments, writer: Writer): void {
      const contract_id = message.contract_id;
      if (contract_id !== null) {
        writer.uint32(10);
        writer.bytes(contract_id);
      }

      writer.uint32(16);
      writer.uint32(message.entry_point);

      const args = message.args;
      if (args !== null) {
        writer.uint32(26);
        writer.bytes(args);
      }
    }

    static decode(reader: Reader, length: i32): call_contract_arguments {
      const end: usize = length < 0 ? reader.end : reader.ptr + length;
      const message = new call_contract_arguments();

      while (reader.ptr < end) {
        const tag = reader.uint32();
        switch (tag >>> 3) {
          case 1:
            message.contract_id = reader.bytes();
            break;

          case 2:
            message.entry_point = reader.uint32();
            break;

          case 3:
            message.args = reader.bytes();
            break;

          default:
            reader.skipType(tag & 7);
            break;
        }
      }

      return message;
    }

    contract_id: Uint8Array | null;
    entry_point: u32;
    args: Uint8Array | null;

    constructor(
      contract_id: Uint8Array | null = null,
      entry_point: u32 = 0,
      args: Uint8Array | null = null
    ) {
      this.contract_id = contract_id;
      this.entry_point = entry_point;
      this.args = args;
    }
  }

  export class call_contract_result {
    static encode(message: call_contract_result, writer: Writer): void {
      const value = message.value;
      if (value !== null) {
        writer.uint32(10);
        writer.bytes(value);
      }
    }

    static decode(reader: Reader, length: i32): call_contract_result {
      const end: usize = length < 0 ? reader.end : reader.ptr + length;
      const message = new call_contract_result();

      while (reader.ptr < end) {
        const tag = reader.uint32();
        switch (tag >>> 3) {
          case 1:
            message.value = reader.bytes();
            break;

          default:
            reader.skipType(tag & 7);
            break;
        }
      }

      return message;
    }

    value: Uint8Array | null;

    constructor(value: Uint8Array | null = null) {
      this.value = value;
    }
  }

  @unmanaged
  export class get_entry_point_arguments {
    static encode(message: get_entry_point_arguments, writer: Writer): void { }

    static decode(reader: Reader, length: i32): get_entry_point_arguments {
      const end: usize = length < 0 ? reader.end : reader.ptr + length;
      const message = new get_entry_point_arguments();

      while (reader.ptr < end) {
        const tag = reader.uint32();
        switch (tag >>> 3) {
          default:
            reader.skipType(tag & 7);
            break;
        }
      }

      return message;
    }

    constructor() { }
  }

  @unmanaged
  export class get_entry_point_result {
    static encode(message: get_entry_point_result, writer: Writer): void {
      writer.uint32(8);
      writer.uint32(message.value);
    }

    static decode(reader: Reader, length: i32): get_entry_point_result {
      const end: usize = length < 0 ? reader.end : reader.ptr + length;
      const message = new get_entry_point_result();

      while (reader.ptr < end) {
        const tag = reader.uint32();
        switch (tag >>> 3) {
          case 1:
            message.value = reader.uint32();
            break;

          default:
            reader.skipType(tag & 7);
            break;
        }
      }

      return message;
    }

    value: u32;

    constructor(value: u32 = 0) {
      this.value = value;
    }
  }

  @unmanaged
  export class get_contract_arguments_size_arguments {
    static encode(
      message: get_contract_arguments_size_arguments,
      writer: Writer
    ): void { }

    static decode(
      reader: Reader,
      length: i32
    ): get_contract_arguments_size_arguments {
      const end: usize = length < 0 ? reader.end : reader.ptr + length;
      const message = new get_contract_arguments_size_arguments();

      while (reader.ptr < end) {
        const tag = reader.uint32();
        switch (tag >>> 3) {
          default:
            reader.skipType(tag & 7);
            break;
        }
      }

      return message;
    }

    constructor() { }
  }

  @unmanaged
  export class get_contract_arguments_size_result {
    static encode(
      message: get_contract_arguments_size_result,
      writer: Writer
    ): void {
      writer.uint32(8);
      writer.uint32(message.value);
    }

    static decode(
      reader: Reader,
      length: i32
    ): get_contract_arguments_size_result {
      const end: usize = length < 0 ? reader.end : reader.ptr + length;
      const message = new get_contract_arguments_size_result();

      while (reader.ptr < end) {
        const tag = reader.uint32();
        switch (tag >>> 3) {
          case 1:
            message.value = reader.uint32();
            break;

          default:
            reader.skipType(tag & 7);
            break;
        }
      }

      return message;
    }

    value: u32;

    constructor(value: u32 = 0) {
      this.value = value;
    }
  }

  @unmanaged
  export class get_contract_arguments_arguments {
    static encode(
      message: get_contract_arguments_arguments,
      writer: Writer
    ): void { }

    static decode(
      reader: Reader,
      length: i32
    ): get_contract_arguments_arguments {
      const end: usize = length < 0 ? reader.end : reader.ptr + length;
      const message = new get_contract_arguments_arguments();

      while (reader.ptr < end) {
        const tag = reader.uint32();
        switch (tag >>> 3) {
          default:
            reader.skipType(tag & 7);
            break;
        }
      }

      return message;
    }

    constructor() { }
  }

  export class get_contract_arguments_result {
    static encode(
      message: get_contract_arguments_result,
      writer: Writer
    ): void {
      const value = message.value;
      if (value !== null) {
        writer.uint32(10);
        writer.bytes(value);
      }
    }

    static decode(
      reader: Reader,
      length: i32
    ): get_contract_arguments_result {
      const end: usize = length < 0 ? reader.end : reader.ptr + length;
      const message = new get_contract_arguments_result();

      while (reader.ptr < end) {
        const tag = reader.uint32();
        switch (tag >>> 3) {
          case 1:
            message.value = reader.bytes();
            break;

          default:
            reader.skipType(tag & 7);
            break;
        }
      }

      return message;
    }

    value: Uint8Array | null;

    constructor(value: Uint8Array | null = null) {
      this.value = value;
    }
  }

  export class set_contract_result_arguments {
    static encode(
      message: set_contract_result_arguments,
      writer: Writer
    ): void {
      const value = message.value;
      if (value !== null) {
        writer.uint32(10);
        writer.bytes(value);
      }
    }

    static decode(
      reader: Reader,
      length: i32
    ): set_contract_result_arguments {
      const end: usize = length < 0 ? reader.end : reader.ptr + length;
      const message = new set_contract_result_arguments();

      while (reader.ptr < end) {
        const tag = reader.uint32();
        switch (tag >>> 3) {
          case 1:
            message.value = reader.bytes();
            break;

          default:
            reader.skipType(tag & 7);
            break;
        }
      }

      return message;
    }

    value: Uint8Array | null;

    constructor(value: Uint8Array | null = null) {
      this.value = value;
    }
  }

  @unmanaged
  export class set_contract_result_result {
    static encode(
      message: set_contract_result_result,
      writer: Writer
    ): void { }

    static decode(reader: Reader, length: i32): set_contract_result_result {
      const end: usize = length < 0 ? reader.end : reader.ptr + length;
      const message = new set_contract_result_result();

      while (reader.ptr < end) {
        const tag = reader.uint32();
        switch (tag >>> 3) {
          default:
            reader.skipType(tag & 7);
            break;
        }
      }

      return message;
    }

    constructor() { }
  }

  @unmanaged
  export class exit_contract_arguments {
    static encode(message: exit_contract_arguments, writer: Writer): void {
      writer.uint32(8);
      writer.uint32(message.exit_code);
    }

    static decode(reader: Reader, length: i32): exit_contract_arguments {
      const end: usize = length < 0 ? reader.end : reader.ptr + length;
      const message = new exit_contract_arguments();

      while (reader.ptr < end) {
        const tag = reader.uint32();
        switch (tag >>> 3) {
          case 1:
            message.exit_code = reader.uint32();
            break;

          default:
            reader.skipType(tag & 7);
            break;
        }
      }

      return message;
    }

    exit_code: u32;

    constructor(exit_code: u32 = 0) {
      this.exit_code = exit_code;
    }
  }

  @unmanaged
  export class exit_contract_result {
    static encode(message: exit_contract_result, writer: Writer): void { }

    static decode(reader: Reader, length: i32): exit_contract_result {
      const end: usize = length < 0 ? reader.end : reader.ptr + length;
      const message = new exit_contract_result();

      while (reader.ptr < end) {
        const tag = reader.uint32();
        switch (tag >>> 3) {
          default:
            reader.skipType(tag & 7);
            break;
        }
      }

      return message;
    }

    constructor() { }
  }

  @unmanaged
  export class get_head_info_arguments {
    static encode(message: get_head_info_arguments, writer: Writer): void { }

    static decode(reader: Reader, length: i32): get_head_info_arguments {
      const end: usize = length < 0 ? reader.end : reader.ptr + length;
      const message = new get_head_info_arguments();

      while (reader.ptr < end) {
        const tag = reader.uint32();
        switch (tag >>> 3) {
          default:
            reader.skipType(tag & 7);
            break;
        }
      }

      return message;
    }

    constructor() { }
  }

  export class get_head_info_result {
    static encode(message: get_head_info_result, writer: Writer): void {
      const value = message.value;
      if (value !== null) {
        writer.uint32(10);
        writer.fork();
        chain.head_info.encode(value, writer);
        writer.ldelim();
      }
    }

    static decode(reader: Reader, length: i32): get_head_info_result {
      const end: usize = length < 0 ? reader.end : reader.ptr + length;
      const message = new get_head_info_result();

      while (reader.ptr < end) {
        const tag = reader.uint32();
        switch (tag >>> 3) {
          case 1:
            message.value = chain.head_info.decode(
              reader,
              reader.uint32()
            );
            break;

          default:
            reader.skipType(tag & 7);
            break;
        }
      }

      return message;
    }

    value: chain.head_info | null;

    constructor(value: chain.head_info | null = null) {
      this.value = value;
    }
  }

  export class hash_arguments {
    static encode(message: hash_arguments, writer: Writer): void {
      writer.uint32(8);
      writer.uint64(message.code);

      const obj = message.obj;
      if (obj !== null) {
        writer.uint32(18);
        writer.bytes(obj);
      }

      writer.uint32(24);
      writer.uint64(message.size);
    }

    static decode(reader: Reader, length: i32): hash_arguments {
      const end: usize = length < 0 ? reader.end : reader.ptr + length;
      const message = new hash_arguments();

      while (reader.ptr < end) {
        const tag = reader.uint32();
        switch (tag >>> 3) {
          case 1:
            message.code = reader.uint64();
            break;

          case 2:
            message.obj = reader.bytes();
            break;

          case 3:
            message.size = reader.uint64();
            break;

          default:
            reader.skipType(tag & 7);
            break;
        }
      }

      return message;
    }

    code: u64;
    obj: Uint8Array | null;
    size: u64;

    constructor(code: u64 = 0, obj: Uint8Array | null = null, size: u64 = 0) {
      this.code = code;
      this.obj = obj;
      this.size = size;
    }
  }

  export class hash_result {
    static encode(message: hash_result, writer: Writer): void {
      const value = message.value;
      if (value !== null) {
        writer.uint32(10);
        writer.bytes(value);
      }
    }

    static decode(reader: Reader, length: i32): hash_result {
      const end: usize = length < 0 ? reader.end : reader.ptr + length;
      const message = new hash_result();

      while (reader.ptr < end) {
        const tag = reader.uint32();
        switch (tag >>> 3) {
          case 1:
            message.value = reader.bytes();
            break;

          default:
            reader.skipType(tag & 7);
            break;
        }
      }

      return message;
    }

    value: Uint8Array | null;

    constructor(value: Uint8Array | null = null) {
      this.value = value;
    }
  }

  export class recover_public_key_arguments {
    static encode(
      message: recover_public_key_arguments,
      writer: Writer
    ): void {
      const signature_data = message.signature_data;
      if (signature_data !== null) {
        writer.uint32(10);
        writer.bytes(signature_data);
      }

      const digest = message.digest;
      if (digest !== null) {
        writer.uint32(18);
        writer.bytes(digest);
      }
    }

    static decode(reader: Reader, length: i32): recover_public_key_arguments {
      const end: usize = length < 0 ? reader.end : reader.ptr + length;
      const message = new recover_public_key_arguments();

      while (reader.ptr < end) {
        const tag = reader.uint32();
        switch (tag >>> 3) {
          case 1:
            message.signature_data = reader.bytes();
            break;

          case 2:
            message.digest = reader.bytes();
            break;

          default:
            reader.skipType(tag & 7);
            break;
        }
      }

      return message;
    }

    signature_data: Uint8Array | null;
    digest: Uint8Array | null;

    constructor(
      signature_data: Uint8Array | null = null,
      digest: Uint8Array | null = null
    ) {
      this.signature_data = signature_data;
      this.digest = digest;
    }
  }

  export class recover_public_key_result {
    static encode(message: recover_public_key_result, writer: Writer): void {
      const value = message.value;
      if (value !== null) {
        writer.uint32(10);
        writer.bytes(value);
      }
    }

    static decode(reader: Reader, length: i32): recover_public_key_result {
      const end: usize = length < 0 ? reader.end : reader.ptr + length;
      const message = new recover_public_key_result();

      while (reader.ptr < end) {
        const tag = reader.uint32();
        switch (tag >>> 3) {
          case 1:
            message.value = reader.bytes();
            break;

          default:
            reader.skipType(tag & 7);
            break;
        }
      }

      return message;
    }

    value: Uint8Array | null;

    constructor(value: Uint8Array | null = null) {
      this.value = value;
    }
  }

  export class get_transaction_payer_arguments {
    static encode(
      message: get_transaction_payer_arguments,
      writer: Writer
    ): void {
      const transaction = message.transaction;
      if (transaction !== null) {
        writer.uint32(10);
        writer.fork();
        protocol.transaction.encode(transaction, writer);
        writer.ldelim();
      }
    }

    static decode(
      reader: Reader,
      length: i32
    ): get_transaction_payer_arguments {
      const end: usize = length < 0 ? reader.end : reader.ptr + length;
      const message = new get_transaction_payer_arguments();

      while (reader.ptr < end) {
        const tag = reader.uint32();
        switch (tag >>> 3) {
          case 1:
            message.transaction = protocol.transaction.decode(
              reader,
              reader.uint32()
            );
            break;

          default:
            reader.skipType(tag & 7);
            break;
        }
      }

      return message;
    }

    transaction: protocol.transaction | null;

    constructor(transaction: protocol.transaction | null = null) {
      this.transaction = transaction;
    }
  }

  export class get_transaction_payer_result {
    static encode(
      message: get_transaction_payer_result,
      writer: Writer
    ): void {
      const value = message.value;
      if (value !== null) {
        writer.uint32(10);
        writer.bytes(value);
      }
    }

    static decode(reader: Reader, length: i32): get_transaction_payer_result {
      const end: usize = length < 0 ? reader.end : reader.ptr + length;
      const message = new get_transaction_payer_result();

      while (reader.ptr < end) {
        const tag = reader.uint32();
        switch (tag >>> 3) {
          case 1:
            message.value = reader.bytes();
            break;

          default:
            reader.skipType(tag & 7);
            break;
        }
      }

      return message;
    }

    value: Uint8Array | null;

    constructor(value: Uint8Array | null = null) {
      this.value = value;
    }
  }

  export class get_account_rc_arguments {
    static encode(message: get_account_rc_arguments, writer: Writer): void {
      const account = message.account;
      if (account !== null) {
        writer.uint32(10);
        writer.bytes(account);
      }
    }

    static decode(reader: Reader, length: i32): get_account_rc_arguments {
      const end: usize = length < 0 ? reader.end : reader.ptr + length;
      const message = new get_account_rc_arguments();

      while (reader.ptr < end) {
        const tag = reader.uint32();
        switch (tag >>> 3) {
          case 1:
            message.account = reader.bytes();
            break;

          default:
            reader.skipType(tag & 7);
            break;
        }
      }

      return message;
    }

    account: Uint8Array | null;

    constructor(account: Uint8Array | null = null) {
      this.account = account;
    }
  }

  @unmanaged
  export class get_account_rc_result {
    static encode(message: get_account_rc_result, writer: Writer): void {
      writer.uint32(8);
      writer.uint64(message.value);
    }

    static decode(reader: Reader, length: i32): get_account_rc_result {
      const end: usize = length < 0 ? reader.end : reader.ptr + length;
      const message = new get_account_rc_result();

      while (reader.ptr < end) {
        const tag = reader.uint32();
        switch (tag >>> 3) {
          case 1:
            message.value = reader.uint64();
            break;

          default:
            reader.skipType(tag & 7);
            break;
        }
      }

      return message;
    }

    value: u64;

    constructor(value: u64 = 0) {
      this.value = value;
    }
  }

  export class consume_account_rc_arguments {
    static encode(
      message: consume_account_rc_arguments,
      writer: Writer
    ): void {
      const account = message.account;
      if (account !== null) {
        writer.uint32(10);
        writer.bytes(account);
      }

      writer.uint32(16);
      writer.uint64(message.value);
    }

    static decode(reader: Reader, length: i32): consume_account_rc_arguments {
      const end: usize = length < 0 ? reader.end : reader.ptr + length;
      const message = new consume_account_rc_arguments();

      while (reader.ptr < end) {
        const tag = reader.uint32();
        switch (tag >>> 3) {
          case 1:
            message.account = reader.bytes();
            break;

          case 2:
            message.value = reader.uint64();
            break;

          default:
            reader.skipType(tag & 7);
            break;
        }
      }

      return message;
    }

    account: Uint8Array | null;
    value: u64;

    constructor(account: Uint8Array | null = null, value: u64 = 0) {
      this.account = account;
      this.value = value;
    }
  }

  @unmanaged
  export class consume_account_rc_result {
    static encode(message: consume_account_rc_result, writer: Writer): void {
      writer.uint32(8);
      writer.bool(message.value);
    }

    static decode(reader: Reader, length: i32): consume_account_rc_result {
      const end: usize = length < 0 ? reader.end : reader.ptr + length;
      const message = new consume_account_rc_result();

      while (reader.ptr < end) {
        const tag = reader.uint32();
        switch (tag >>> 3) {
          case 1:
            message.value = reader.bool();
            break;

          default:
            reader.skipType(tag & 7);
            break;
        }
      }

      return message;
    }

    value: bool;

    constructor(value: bool = false) {
      this.value = value;
    }
  }

  @unmanaged
  export class get_resource_limits_arguments {
    static encode(
      message: get_resource_limits_arguments,
      writer: Writer
    ): void { }

    static decode(
      reader: Reader,
      length: i32
    ): get_resource_limits_arguments {
      const end: usize = length < 0 ? reader.end : reader.ptr + length;
      const message = new get_resource_limits_arguments();

      while (reader.ptr < end) {
        const tag = reader.uint32();
        switch (tag >>> 3) {
          default:
            reader.skipType(tag & 7);
            break;
        }
      }

      return message;
    }

    constructor() { }
  }

  @unmanaged
  export class get_resource_limits_result {
    static encode(message: get_resource_limits_result, writer: Writer): void {
      const value = message.value;
      if (value !== null) {
        writer.uint32(10);
        writer.fork();
        chain.resource_limit_data.encode(value, writer);
        writer.ldelim();
      }
    }

    static decode(reader: Reader, length: i32): get_resource_limits_result {
      const end: usize = length < 0 ? reader.end : reader.ptr + length;
      const message = new get_resource_limits_result();

      while (reader.ptr < end) {
        const tag = reader.uint32();
        switch (tag >>> 3) {
          case 1:
            message.value = chain.resource_limit_data.decode(
              reader,
              reader.uint32()
            );
            break;

          default:
            reader.skipType(tag & 7);
            break;
        }
      }

      return message;
    }

    value: chain.resource_limit_data | null;

    constructor(value: chain.resource_limit_data | null = null) {
      this.value = value;
    }
  }

  @unmanaged
  export class consume_block_resources_arguments {
    static encode(
      message: consume_block_resources_arguments,
      writer: Writer
    ): void {
      writer.uint32(8);
      writer.uint64(message.disk_storage_consumed);

      writer.uint32(16);
      writer.uint64(message.network_bandwidth_consumed);

      writer.uint32(24);
      writer.uint64(message.compute_bandwidth_consumed);
    }

    static decode(
      reader: Reader,
      length: i32
    ): consume_block_resources_arguments {
      const end: usize = length < 0 ? reader.end : reader.ptr + length;
      const message = new consume_block_resources_arguments();

      while (reader.ptr < end) {
        const tag = reader.uint32();
        switch (tag >>> 3) {
          case 1:
            message.disk_storage_consumed = reader.uint64();
            break;

          case 2:
            message.network_bandwidth_consumed = reader.uint64();
            break;

          case 3:
            message.compute_bandwidth_consumed = reader.uint64();
            break;

          default:
            reader.skipType(tag & 7);
            break;
        }
      }

      return message;
    }

    disk_storage_consumed: u64;
    network_bandwidth_consumed: u64;
    compute_bandwidth_consumed: u64;

    constructor(
      disk_storage_consumed: u64 = 0,
      network_bandwidth_consumed: u64 = 0,
      compute_bandwidth_consumed: u64 = 0
    ) {
      this.disk_storage_consumed = disk_storage_consumed;
      this.network_bandwidth_consumed = network_bandwidth_consumed;
      this.compute_bandwidth_consumed = compute_bandwidth_consumed;
    }
  }

  @unmanaged
  export class consume_block_resources_result {
    static encode(
      message: consume_block_resources_result,
      writer: Writer
    ): void {
      writer.uint32(8);
      writer.bool(message.value);
    }

    static decode(
      reader: Reader,
      length: i32
    ): consume_block_resources_result {
      const end: usize = length < 0 ? reader.end : reader.ptr + length;
      const message = new consume_block_resources_result();

      while (reader.ptr < end) {
        const tag = reader.uint32();
        switch (tag >>> 3) {
          case 1:
            message.value = reader.bool();
            break;

          default:
            reader.skipType(tag & 7);
            break;
        }
      }

      return message;
    }

    value: bool;

    constructor(value: bool = false) {
      this.value = value;
    }
  }

  export class get_transaction_rc_limit_arguments {
    static encode(
      message: get_transaction_rc_limit_arguments,
      writer: Writer
    ): void {
      const transaction = message.transaction;
      if (transaction !== null) {
        writer.uint32(10);
        writer.fork();
        protocol.transaction.encode(transaction, writer);
        writer.ldelim();
      }
    }

    static decode(
      reader: Reader,
      length: i32
    ): get_transaction_rc_limit_arguments {
      const end: usize = length < 0 ? reader.end : reader.ptr + length;
      const message = new get_transaction_rc_limit_arguments();

      while (reader.ptr < end) {
        const tag = reader.uint32();
        switch (tag >>> 3) {
          case 1:
            message.transaction = protocol.transaction.decode(
              reader,
              reader.uint32()
            );
            break;

          default:
            reader.skipType(tag & 7);
            break;
        }
      }

      return message;
    }

    transaction: protocol.transaction | null;

    constructor(transaction: protocol.transaction | null = null) {
      this.transaction = transaction;
    }
  }

  @unmanaged
  export class get_transaction_rc_limit_result {
    static encode(
      message: get_transaction_rc_limit_result,
      writer: Writer
    ): void {
      writer.uint32(8);
      writer.uint64(message.value);
    }

    static decode(
      reader: Reader,
      length: i32
    ): get_transaction_rc_limit_result {
      const end: usize = length < 0 ? reader.end : reader.ptr + length;
      const message = new get_transaction_rc_limit_result();

      while (reader.ptr < end) {
        const tag = reader.uint32();
        switch (tag >>> 3) {
          case 1:
            message.value = reader.uint64();
            break;

          default:
            reader.skipType(tag & 7);
            break;
        }
      }

      return message;
    }

    value: u64;

    constructor(value: u64 = 0) {
      this.value = value;
    }
  }

  @unmanaged
  export class get_last_irreversible_block_arguments {
    static encode(
      message: get_last_irreversible_block_arguments,
      writer: Writer
    ): void { }

    static decode(
      reader: Reader,
      length: i32
    ): get_last_irreversible_block_arguments {
      const end: usize = length < 0 ? reader.end : reader.ptr + length;
      const message = new get_last_irreversible_block_arguments();

      while (reader.ptr < end) {
        const tag = reader.uint32();
        switch (tag >>> 3) {
          default:
            reader.skipType(tag & 7);
            break;
        }
      }

      return message;
    }

    constructor() { }
  }

  @unmanaged
  export class get_last_irreversible_block_result {
    static encode(
      message: get_last_irreversible_block_result,
      writer: Writer
    ): void {
      writer.uint32(8);
      writer.uint64(message.value);
    }

    static decode(
      reader: Reader,
      length: i32
    ): get_last_irreversible_block_result {
      const end: usize = length < 0 ? reader.end : reader.ptr + length;
      const message = new get_last_irreversible_block_result();

      while (reader.ptr < end) {
        const tag = reader.uint32();
        switch (tag >>> 3) {
          case 1:
            message.value = reader.uint64();
            break;

          default:
            reader.skipType(tag & 7);
            break;
        }
      }

      return message;
    }

    value: u64;

    constructor(value: u64 = 0) {
      this.value = value;
    }
  }

  @unmanaged
  export class get_caller_arguments {
    static encode(message: get_caller_arguments, writer: Writer): void { }

    static decode(reader: Reader, length: i32): get_caller_arguments {
      const end: usize = length < 0 ? reader.end : reader.ptr + length;
      const message = new get_caller_arguments();

      while (reader.ptr < end) {
        const tag = reader.uint32();
        switch (tag >>> 3) {
          default:
            reader.skipType(tag & 7);
            break;
        }
      }

      return message;
    }

    constructor() { }
  }

  export class get_caller_result {
    static encode(message: get_caller_result, writer: Writer): void {
      const value = message.value;
      if (value !== null) {
        writer.uint32(10);
        writer.fork();
        chain.caller_data.encode(value, writer);
        writer.ldelim();
      }
    }

    static decode(reader: Reader, length: i32): get_caller_result {
      const end: usize = length < 0 ? reader.end : reader.ptr + length;
      const message = new get_caller_result();

      while (reader.ptr < end) {
        const tag = reader.uint32();
        switch (tag >>> 3) {
          case 1:
            message.value = chain.caller_data.decode(
              reader,
              reader.uint32()
            );
            break;

          default:
            reader.skipType(tag & 7);
            break;
        }
      }

      return message;
    }

    value: chain.caller_data | null;

    constructor(value: chain.caller_data | null = null) {
      this.value = value;
    }
  }

  export class require_authority_arguments {
    static encode(
      message: require_authority_arguments,
      writer: Writer
    ): void {
      const account = message.account;
      if (account !== null) {
        writer.uint32(10);
        writer.bytes(account);
      }
    }

    static decode(reader: Reader, length: i32): require_authority_arguments {
      const end: usize = length < 0 ? reader.end : reader.ptr + length;
      const message = new require_authority_arguments();

      while (reader.ptr < end) {
        const tag = reader.uint32();
        switch (tag >>> 3) {
          case 1:
            message.account = reader.bytes();
            break;

          default:
            reader.skipType(tag & 7);
            break;
        }
      }

      return message;
    }

    account: Uint8Array | null;

    constructor(account: Uint8Array | null = null) {
      this.account = account;
    }
  }

  @unmanaged
  export class require_authority_result {
    static encode(message: require_authority_result, writer: Writer): void { }

    static decode(reader: Reader, length: i32): require_authority_result {
      const end: usize = length < 0 ? reader.end : reader.ptr + length;
      const message = new require_authority_result();

      while (reader.ptr < end) {
        const tag = reader.uint32();
        switch (tag >>> 3) {
          default:
            reader.skipType(tag & 7);
            break;
        }
      }

      return message;
    }

    constructor() { }
  }

  @unmanaged
  export class get_transaction_signature_arguments {
    static encode(
      message: get_transaction_signature_arguments,
      writer: Writer
    ): void { }

    static decode(
      reader: Reader,
      length: i32
    ): get_transaction_signature_arguments {
      const end: usize = length < 0 ? reader.end : reader.ptr + length;
      const message = new get_transaction_signature_arguments();

      while (reader.ptr < end) {
        const tag = reader.uint32();
        switch (tag >>> 3) {
          default:
            reader.skipType(tag & 7);
            break;
        }
      }

      return message;
    }

    constructor() { }
  }

  export class get_transaction_signature_result {
    static encode(
      message: get_transaction_signature_result,
      writer: Writer
    ): void {
      const value = message.value;
      if (value !== null) {
        writer.uint32(10);
        writer.bytes(value);
      }
    }

    static decode(
      reader: Reader,
      length: i32
    ): get_transaction_signature_result {
      const end: usize = length < 0 ? reader.end : reader.ptr + length;
      const message = new get_transaction_signature_result();

      while (reader.ptr < end) {
        const tag = reader.uint32();
        switch (tag >>> 3) {
          case 1:
            message.value = reader.bytes();
            break;

          default:
            reader.skipType(tag & 7);
            break;
        }
      }

      return message;
    }

    value: Uint8Array | null;

    constructor(value: Uint8Array | null = null) {
      this.value = value;
    }
  }

  @unmanaged
  export class get_contract_id_arguments {
    static encode(message: get_contract_id_arguments, writer: Writer): void { }

    static decode(reader: Reader, length: i32): get_contract_id_arguments {
      const end: usize = length < 0 ? reader.end : reader.ptr + length;
      const message = new get_contract_id_arguments();

      while (reader.ptr < end) {
        const tag = reader.uint32();
        switch (tag >>> 3) {
          default:
            reader.skipType(tag & 7);
            break;
        }
      }

      return message;
    }

    constructor() { }
  }

  export class get_contract_id_result {
    static encode(message: get_contract_id_result, writer: Writer): void {
      const value = message.value;
      if (value !== null) {
        writer.uint32(10);
        writer.bytes(value);
      }
    }

    static decode(reader: Reader, length: i32): get_contract_id_result {
      const end: usize = length < 0 ? reader.end : reader.ptr + length;
      const message = new get_contract_id_result();

      while (reader.ptr < end) {
        const tag = reader.uint32();
        switch (tag >>> 3) {
          case 1:
            message.value = reader.bytes();
            break;

          default:
            reader.skipType(tag & 7);
            break;
        }
      }

      return message;
    }

    value: Uint8Array | null;

    constructor(value: Uint8Array | null = null) {
      this.value = value;
    }
  }

  export class get_account_nonce_arguments {
    static encode(
      message: get_account_nonce_arguments,
      writer: Writer
    ): void {
      const account = message.account;
      if (account !== null) {
        writer.uint32(10);
        writer.bytes(account);
      }
    }

    static decode(reader: Reader, length: i32): get_account_nonce_arguments {
      const end: usize = length < 0 ? reader.end : reader.ptr + length;
      const message = new get_account_nonce_arguments();

      while (reader.ptr < end) {
        const tag = reader.uint32();
        switch (tag >>> 3) {
          case 1:
            message.account = reader.bytes();
            break;

          default:
            reader.skipType(tag & 7);
            break;
        }
      }

      return message;
    }

    account: Uint8Array | null;

    constructor(account: Uint8Array | null = null) {
      this.account = account;
    }
  }

  @unmanaged
  export class get_account_nonce_result {
    static encode(message: get_account_nonce_result, writer: Writer): void {
      writer.uint32(8);
      writer.uint64(message.value);
    }

    static decode(reader: Reader, length: i32): get_account_nonce_result {
      const end: usize = length < 0 ? reader.end : reader.ptr + length;
      const message = new get_account_nonce_result();

      while (reader.ptr < end) {
        const tag = reader.uint32();
        switch (tag >>> 3) {
          case 1:
            message.value = reader.uint64();
            break;

          default:
            reader.skipType(tag & 7);
            break;
        }
      }

      return message;
    }

    value: u64;

    constructor(value: u64 = 0) {
      this.value = value;
    }
  }

  export enum privilege {
    kernel_mode = 0,
    user_mode = 1,
  }
}
