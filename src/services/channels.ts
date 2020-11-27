import { Channel } from "phoenix";
interface INetworkObject {
    gameChannel?: Channel,
}

const network: INetworkObject = {}

export { network }