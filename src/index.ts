import { isTimeInTimeframe, type Timeframe } from './lib/lib';


//#region ManagedElement

export class ManagedElement
{
    /**
     * @param e element that should be displayed on canvas.
     * @param parent parent element to which this element should be mounted to.
     * @param tf timings to display element (see {@link Timeframe}).
     */
    constructor(e: HTMLElement, parent: HTMLElement, tf: Timeframe | Timeframe[])
    {
        this.e = e;
        this.parent = parent;
        this.tf = tf;
    }


    public readonly e: HTMLElement;
    public parent: HTMLElement;
    /** Display timing. */
    public tf: Timeframe | Timeframe[];

    /**
     * Mounts element to the parent. If already mounted, does nothing.
     */
    public mount()
    {
        if (!this.parent.contains(this.e))
        {
            this.parent.append(this.e);
        }
    }

    /**
     * Removes element from the parent. If element is not mounted to the
     * parent, does nothing.
     */
    public unmount()
    {
        if (this.parent.contains(this.e))
        {
            this.e.remove();
        }
    }

    /**
     * Checks if time in defined timeframe (meaning the element should be
     * displayed).
     */
    public shouldDisplay(t: number): boolean
    {
        if (Array.isArray(this.tf))
        {
            return this.tf.some(v => isTimeInTimeframe(t, v));
        }
        else
        {
            return isTimeInTimeframe(t, this.tf);
        }
    }
}

//#endregion


//#region Manager

export class Manager
{
    constructor()
    {
        //
    }


    public readonly elements: ManagedElement[] = [];

    private _counter: number = 0;
    public get counter()
    {
        return this._counter;
    }
    public set counter(v)
    {
        this._counter = v;
        this.updateElements(v);
    }

    protected updateElements(counter: number)
    {
        for (const ce of this.elements)
        {
            if (ce.shouldDisplay(counter))
            {
                ce.mount();
            }
            else
            {
                ce.unmount();
            }
        }
    }

    /**
     * Adds an element to the elements collection.
     */
    public add(ce: ManagedElement)
    {
        this.elements.push(ce);
    }

    // /**
    //  * Removes an element with specified query selector from the elements collection.
    //  */
    // public remove(query: string)
    // {
    //     const i = this.elements.findIndex(e => e.id === id);
    //     if (i > -1)
    //     {
    //         this.elements[i]?.e.remove();
    //         this.elements.splice(i, 1);
    //     }
    //     else
    //     {
    //         console.warn(`Cannot find element with id "${id}".`);
    //     }
    // }

    /**
     * Removes all elements from the canvas elements collection.
     */
    public removeAll()
    {
        for (const ce of this.elements)
        {
            ce.unmount();
        }

        this.elements.length = 0;
    }
}

//#endregion


//#region Controller

export interface ControllerOptions {
    step?: number;
}

export class Controller
{
    constructor(m: Manager, options: ControllerOptions = {})
    {
        this.m = m;
        this.step = options.step ?? 1;
    }


    private readonly m: Manager;
    public step: number;

    /**
     * Increments {@link Manager.counter} by {@link Controller.step}.
     */
    public inc()
    {
        this.m.counter += this.step;
    }

    /**
     * Decrements {@link Manager.counter} by {@link Controller.step}.
     */
    public dec()
    {
        this.m.counter -= this.step;
    }

    /**
     * Adds `v` to the {@link Manager.counter}.
     */
    public add(v: number)
    {
        this.m.counter += v;
    }

    /**
     * Substracts `v` from the {@link Manager.counter}.
     */
    public sub(v: number)
    {
        this.m.counter -= v;
    }

    /**
     * Sets {@link Manager.counter} to `v`.
     */
    public set(v: number)
    {
        this.m.counter = v;
    }
}

//#endregion
