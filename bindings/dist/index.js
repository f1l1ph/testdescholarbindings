import { Buffer } from "buffer";
import { Client as ContractClient, Spec as ContractSpec, } from "@stellar/stellar-sdk/contract";
export * from "@stellar/stellar-sdk";
export * as contract from "@stellar/stellar-sdk/contract";
export * as rpc from "@stellar/stellar-sdk/rpc";
if (typeof window !== "undefined") {
    //@ts-ignore Buffer exists
    window.Buffer = window.Buffer || Buffer;
}
export const networks = {
    testnet: {
        networkPassphrase: "Test SDF Network ; September 2015",
        contractId: "CB7FB7TQ3H4XFVNXREBZYMQ7Q7DF3WZTYC7C7IQ4WDHJSQWBV7UJOBHX",
    },
};
export const Errors = {};
export class Client extends ContractClient {
    options;
    static async deploy(
    /** Options for initalizing a Client as well as for calling a method, with extras specific to deploying. */
    options) {
        return ContractClient.deploy(null, options);
    }
    constructor(options) {
        super(new ContractSpec([
            "AAAAAQAAAAAAAAAAAAAAC1NjaG9sYXJzaGlwAAAAAAgAAAAAAAAABWFkbWluAAAAAAAAEwAAAAAAAAAQYXZhaWxhYmxlX2dyYW50cwAAAAYAAAAAAAAAB2RldGFpbHMAAAAAEAAAAAAAAAAIZW5kX2RhdGUAAAAGAAAAAAAAAAJpZAAAAAAABgAAAAAAAAAEbmFtZQAAABAAAAAAAAAAFHN0dWRlbnRfZ3JhbnRfYW1vdW50AAAACwAAAAAAAAAFdG9rZW4AAAAAAAAT",
            "AAAAAQAAAAAAAAAAAAAAC0FwcGxpY2F0aW9uAAAAAAYAAAAAAAAACWFwcGxpY2FudAAAAAAAABMAAAAAAAAADmFwcGxpY2FudF9uYW1lAAAAAAAQAAAAAAAAAAdkZXRhaWxzAAAAABAAAAAAAAAAAmlkAAAAAAAGAAAAAAAAAA5zY2hvbGFyc2hpcF9pZAAAAAAABgAAAAAAAAAGc3RhdHVzAAAAAAfQAAAAEUFwcGxpY2F0aW9uU3RhdHVzAAAA",
            "AAAAAgAAAAAAAAAAAAAAEUFwcGxpY2F0aW9uU3RhdHVzAAAAAAAAAwAAAAAAAAAAAAAAB1BlbmRpbmcAAAAAAAAAAAAAAAAIQXBwcm92ZWQAAAAAAAAAAAAAAAhSZWplY3RlZA==",
            "AAAAAAAAAAAAAAAQcG9zdF9zY2hvbGFyc2hpcAAAAAEAAAAAAAAAC3NjaG9sYXJzaGlwAAAAB9AAAAALU2Nob2xhcnNoaXAAAAAAAQAAA+oAAAfQAAAAC1NjaG9sYXJzaGlwAA==",
            "AAAAAAAAAAAAAAAFYXBwbHkAAAAAAAABAAAAAAAAAAthcHBsaWNhdGlvbgAAAAfQAAAAC0FwcGxpY2F0aW9uAAAAAAEAAAPqAAAH0AAAAAtBcHBsaWNhdGlvbgA=",
            "AAAAAAAAAAAAAAAQZ2V0X3NjaG9sYXJzaGlwcwAAAAAAAAABAAAD6gAAB9AAAAALU2Nob2xhcnNoaXAA",
            "AAAAAAAAAAAAAAAVcGlja19ncmFudGVkX3N0dWRlbnRzAAAAAAAAAwAAAAAAAAAOc2Nob2xhcnNoaXBfaWQAAAAAAAYAAAAAAAAACHN0dWRlbnRzAAAD6gAAABMAAAAAAAAABmNhbGxlcgAAAAAAEwAAAAA=",
            "AAAAAAAAAAAAAAATZ2V0X215X3NjaG9sYXJzaGlwcwAAAAABAAAAAAAAAAdhZGRyZXNzAAAAABMAAAABAAAD6gAAB9AAAAALU2Nob2xhcnNoaXAA",
            "AAAAAAAAAAAAAAAQZ2V0X2FwcGxpY2F0aW9ucwAAAAAAAAABAAAD6gAAB9AAAAALQXBwbGljYXRpb24A",
            "AAAAAAAAAAAAAAATZ2V0X215X2FwcGxpY2F0aW9ucwAAAAABAAAAAAAAAAdhZGRyZXNzAAAAABMAAAABAAAD6gAAB9AAAAALQXBwbGljYXRpb24A",
            "AAAAAAAAAAAAAAAeZ2V0X2FwcGxpY2F0aW9uc19mcm1fc2NobHJzaGlwAAAAAAABAAAAAAAAAA5zY2hvbGFyc2hpcF9pZAAAAAAABgAAAAEAAAPqAAAH0AAAAAtBcHBsaWNhdGlvbgA=",
            "AAAAAAAAAAAAAAAScmVqZWN0X2FwcGxpY2F0aW9uAAAAAAABAAAAAAAAAA5hcHBsaWNhdGlvbl9pZAAAAAAABgAAAAA=",
        ]), options);
        this.options = options;
    }
    fromJSON = {
        post_scholarship: (this.txFromJSON),
        apply: (this.txFromJSON),
        get_scholarships: (this.txFromJSON),
        pick_granted_students: (this.txFromJSON),
        get_my_scholarships: (this.txFromJSON),
        get_applications: (this.txFromJSON),
        get_my_applications: (this.txFromJSON),
        get_applications_frm_schlrship: (this.txFromJSON),
        reject_application: (this.txFromJSON),
    };
}
