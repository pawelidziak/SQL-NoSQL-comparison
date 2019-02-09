export class Benchmark {
  private start = process.hrtime();

  constructor() {}

  elapsed(): number {
    const end = process.hrtime(this.start);
    return Math.round((end[0] * 1000) + (end[1] / 1000000));
  }
}

/**
 * OTHER METHODS
 *     const t0 = performance.now();
 *     console.time('FooTimer');
 *
 *     doSth()
 *
 *     console.timeEnd('FooTimer');
 *     const t1 = performance.now();
 *     console.log("Call to doSomething took " + (t1 - t0) + " milliseconds.");
 */
