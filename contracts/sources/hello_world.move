module helloworld::hello_world {
    use sui::object::{Self,UID};
    use sui::transfer;
    use sui::tx_context::TxContext;
    use std::string::{Self,String};
    struct Message has key {
        id : UID,
        value: String
    }

    fun init(ctx: &mut TxContext) {
        transfer::share_object(Message{
            id: object::new(ctx),
            value: string::utf8(b"")
        })
    }

    public entry fun setMessage(message_object: &mut Message,message: String) {
        message_object.value = message
    }
}

// 0x824bfc4e87b42206424d0d5c712af928c8827b79318b06c3736c0cde29a84c53
// 0x7969799a82f209874a755f96effa11feed7b8a303a0c7f4bfffdeba9bb0ca1b6