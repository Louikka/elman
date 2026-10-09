import { isTimeInTimeframe, simpleUUID, type Timeframe } from './lib';


export class ManagerElement
{
    /**
     * @param e element that should be displayed on canvas.
     * @param parent parent element to which this element should be mounted to.
     * @param tf timings to display element (see {@link Timeframe}).
     * @param id optional element ID.
     */
    constructor(e: HTMLElement, parent: HTMLElement, tf: Timeframe | Timeframe[], id: string = simpleUUID())
    {
        this.e = e;
        this.parent = parent;

        this.id = id;

        this.tf = tf;
    }


    public readonly e: HTMLElement;
    public parent: HTMLElement;

    public readonly id: string;

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


/**
 * Base class containing all core functionality.
 */
export class Manager
{
    public readonly elements: ManagerElement[] = [];

    /**
     * Adds an element to the elements collection.
     */
    public add(e: ManagerElement)
    {
        this.elements.push(e);
    }

    /**
     * Removes an element from the elements collection by its ID.
     */
    public remove(id: string)
    {
        const i = this.elements.findIndex(e => e.id === id);
        if (i > -1)
        {
            const e = this.elements[i]!;

            e.unmount();
            this.elements.splice(i, 1);
        }
        else
        {
            console.warn(`Cannot find element with id "${id}".`);
        }
    }

    /**
     * Removes all elements from the elements collection.
     */
    public removeAll()
    {
        for (const e of this.elements)
        {
            e.unmount();
        }

        this.elements.length = 0;
    }

    /**
     * Mounts or unmounts elements from {@link Manager.elements} based on the
     * `t` parameter.
     *
     * @param t time against which elements are being tested.
     */
    public updateElements(t: number)
    {
        for (const e of this.elements)
        {
            if (e.shouldDisplay(t))
            {
                e.mount();
            }
            else
            {
                e.unmount();
            }
        }
    }
}
