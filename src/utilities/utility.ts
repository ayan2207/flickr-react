export function setTrue(state: any, action: any) {
    return true;
}

export function setFalse(state: any, action: any) {
    return false;
}

export function setNull(state: any, action: any) {
    return null;
}

export function setPayload(currentState: any, action: any) {
    if (action.payload) {
        return action.payload;
    } else {
        return null;
    }

}