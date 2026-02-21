export function fmt(n: number): string {
    if (isFinite(n) && !isNaN(n)) {
        if (Math.abs(n) >= 1e6) {
            return "$" + (n / 1e6).toFixed(2) + "M";
        }
        if (Math.abs(n) >= 1e3) {
            return "$" + (n / 1e3).toFixed(1) + "K";
        }
        return "$" + n.toFixed(2);
    }
    return "$0.00";
}

export function fmtN(n: number): string {
    return isFinite(n) ? Math.round(n).toLocaleString() : "0";
}
