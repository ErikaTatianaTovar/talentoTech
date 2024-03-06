class CodeGenerator {
    static generateUniqueCode() {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const nums = '0123456789';
        let code = '';
        for (let i = 0; i < 4; i++) {
            code += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        for (let i = 0; i < 4; i++) {
            code += nums.charAt(Math.floor(Math.random() * nums.length));
        }
        return code;
    }
}

module.exports = CodeGenerator;