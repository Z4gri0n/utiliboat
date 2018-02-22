module.exports = class Command {

    constructor(client) {
        this.client = client;
        this.aliases = [];
        this.subcommands = [];
    }

    /**
   * Check for subcommands, if finds execute it else executes the command itself
   * @param {Message} msg Message that triggered this command
   * @param {Array<string>} args Command arguments
   * @param {Object} strings String object with strings for this command
   */
   _run(msg, args, strings) {
       if(args.length > 0) {
           let subcommand = this.subcommands.find(c => c.name.toLowerCase() == args[0] || c.aliases.includes(args[0]));
           if(subcommand && subcommand.canRun(msg, args.slice(1))) {
               return subcommand.run(msg, args.slice(1), strings);
           }
       }
       return this.run(msg, args, strings);
   }

   /**
   * Execute this command
   * @param {Message} msg Message that triggered this command
   * @param {Array<string>} args Command arguments
   * @param {Object} strings String object with strings for this command
   */
   run() {}
  
  /**
   * Returns true if this command can be ran
   * @param {Message} msg Message that triggered this command
   * @param {Array<string>} args Command arguments
   * @returns {boolean} If this command can be ran
   */
   canRun() {
    return true
   }
}