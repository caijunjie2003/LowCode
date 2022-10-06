import React, {
  useState,
  useReducer,
  useMemo,
  useCallback,
  useRef,
  useEffect,
  useDebugValue,
  useLayoutEffect,
} from "react";
import { SortableContainer, SortableElement } from "react-sortable-hoc";
import { arrayMoveImmutable } from "array-move";
import reducer from "./reducer";
import { Button } from "antd";
// 说一说你对react的理解吧？有哪些特性？
// 1.react，用于构建用户界面的javaScript库，提供了UI层面的解决方案，遵循组件设计模式，声明式编程和函数式编程概念，以使得前端应用程序更加高效
// 使用虚拟DOM莱有效的操作DOM，遵循高阶组件到低阶组件的单项数据流，帮助外面将各个界面分成独立的小模块，组件化编程，这些组件可以组装，嵌套，构成整体页面

// 特性
//1.JSX语法：是JavaScript XML 的缩写，是一种新特性，一种定义带属性树结构的语法
// 特性：1.自定义组件名首字母大写
//  2. 在render函数中 return返回的只能由一个顶层标签
//3.遇到html标签就会用html规则解析，遇到代码块，就用js规则解析
//4.驼峰命名
//5.class需要写成className 绑定事件需要采用驼峰命名，react内部重写了所有的事件
//6.允许在模板中插入js变量，如果是一个数组，则会展开这个数组的所有成员
//7.在jsx中插入用户输入是安全的，在渲染前，react内部会将所有的值都转化为字符串形式，可以预防xss攻击

//2.单项数据流 : 数据在某个节点被更改后，只会影响一个方向上的节点,在react框架中，规范数据的流向：数据由外层组件向内层组件进行传递和更新
// 会导致1.子组件无法直接操作父组件的数据 2.子组件无法直接向父组件传递数据
// 如何解决：由父组件将方法传递给子组件的props，进而操作父组件的属性
// 优点：1.所有的状态的改变都可以记录，可追踪，源头易追朔
// 2.所有数据只有一份，组件数据只有唯一的入口和出口，使得程序更直观更容易理解，有利于应用的可维护性
//3.一旦数据变化，就去更新页面，如果用户在页面上做了操作更新了数据，那么就手动收集起来（双向是自动），合并到原有的数据中
// 缺点：1. 代码量会上身，数据流转过程边长，会出现很多类似的更新数据代码
//2.在处理局部i状态较多的场景时，（如用户输入交互的 表单 型 应用），会显得啰嗦及繁琐

// 什么是双向数据流： 无论是数据改变，还是用户操作，都能带来互相的变动，自动更新
// 优点：1.用户在试图上的修改会自动同步到数据模型，数据模型中的值的变化也会立刻同步到视图中
// 2.在用户交互较多的场景下，会简化大量业务无关的代码
//3.无法追踪局部状态的变化
//4.由于数据变化来源入口会变得不止一个，数据流方向不再是向下由外层传给内层，容易导致方向繁乱，不管制好，容易使程序难以维护

//3.虚拟DOM
//4.声明式编程 ： 告诉计算机需要去执行什么，而不是如何去执行
//5.组件化（component）

// Set 是 es6新增的数据结构，类似于数组，但它的一大特性就是所有元素都是唯一的，没有重复的值
// Set是一个构造函数，用来生成Set数据结构
const set = new Set();
export default function Index() {
  // useReducer 是用于提高应用性能的，当更新逻辑比较复杂的时候，我们要考虑使用useReducer，类似于redux，但是不支持中间件~
  // useReducer是 useState的代替方案，用于state复杂变化
  // useReducer是单个组件状态管理，组件通讯还需要使用props
  // redux是全局状态管理，多组件共享数据
  const [state, dispatch] = useReducer(reducer, { count: 0 });
  const AddFn = () => {
    dispatch({
      type: "ADD",
    });
  };
  const [num1, setNumb1] = useState(1);
  const [num2, setNumb2] = useState(5);
  const [count, setCount] = useState(null);

  // 参数是创建函数，和依赖性数组//在render之前执行
  //  返回值是一个带有memoized(memo记录/memo函数内部缓存)的值，发生在render之前，并且这个值仅在依赖性改变时才重新计算
  // 使用useMemo可以避免多余的计算开销，旨在依赖性变化才重新计算，会缓存计算出来的值
  const expensive = useMemo(() => {
    console.log("运算");
    let sum = 0;
    for (let i = 0; i < num1 * 100; i++) {
      sum += i;
    }
    return sum;
  }, [num1]);

  // useCallback  在render之前执行
  // 参数是内联回调函数和依赖项数组
  // 返回值是回调函数的memoized版本，该回调函数仅在某个依赖项改变时更新
  // 使用useCallback：返回一个缓存的函数，添加依赖项数组可以避免函数的无意义计算和调用，降低了渲染开销
  // 和useEffect不同，只会在依赖项更新后才更新执行，避免了组件通信之间的死循环，优化了程序的性能
  const callback = useCallback(() => {
    // 复杂运算
    return num1;
  }, [num1]);
  set.add(callback);

  // 举列子： 1.如果父组件中有一个子组件，将一个axios请求，以及一个数据，传入子组件，子组件触发父组件方法，父组件触发setState
  // 2. state数据更新，组件重新render，导致父组件会重新创建一个 axios请求方法，以及一个新的state
  //3. 子组件发现 axios请求的引用变了，（props更新也会导致组件重新render），又会重新执行
  //4. 导致 死循环
  // 如果useEffect不添加依赖项，会导致eslink报错，如果setstate需要用到state，useEffect/useCallback都需要添加依赖项了
  // 这个时候又会导致死循环，所以我们需要自定义一个hook，将这个axios函数作为依赖项，传入hook中，无论state怎么变化，axios引用都保持不变，所以就不会更改props的引用，就不会死循环

  // 具体代码
  const useRefCallback = (fn, dependencies) => {
    // console.log(fn, "触发");
    const ref = useRef(fn);
    // 每次调用,都会生成一个不同的fn,但都指向getDate,保存了引用了,所以只会执行2次
    // 但state更新,会更新axios方中的state,并且也将ref的指向传入新的fn
    useEffect(() => {
      // ref.current变化的话,不会造成组件的重新渲染,所以 getDate的引用并没有变,子组件不会重新渲染
      // 我们只需要拿到current里面的函数执行即可
      // console.log(dependencies, "set了");
      ref.current = fn;
    }, [fn, ...dependencies]);

    // useCallbakc 返回的函数会被缓存再内存中,只有当依赖项变化的时候,才会重新执行,并且更新函数中的依赖项
    return useCallback(() => {
      //  5 -> 56
      console.log(ref, "ref更新了----");
      const fn = ref.current;
      return fn();
    }, [ref]);
  };
  const getDate = useRefCallback(() => {
    setTimeout(() => {
      setNumb2(num2 + 51);
    }, 300);
  }, [num2]);

  // 返回数字,表示当前size对象中的元素数
  // console.log("demo-calback", set.size);
  function IndexChildren(props) {
    useEffect(() => {
      // console.log(props);
      props.getDate();
    }, [props]);
    return <div></div>;
  }
  // console.log(num2);

  // react-hooks useLayouteffect 和 useEffect的区别
  // useEffect(() => {
  //   if (count === 0) {
  //     setCount(182.01);
  //     // 可以看到会渲染2次，count也连续变更了2次，实际观察种，div是由闪动的，这在交互和性能上是绝对需要避免的
  //     // click setState
  //     // 虚拟DOM设置到真实DOM
  //     // 渲染
  //     // 执行useEffect回调
  //     // setState
  //     // 虚拟dom设置到真实dom
  //     // 渲染
  //   }
  // }, [count]);

  useLayoutEffect(() => {
    // 建议将所有的dom操作放到useLayoutEffect里面，因为再useLayoutEffect种DOM已经被修改，通过useLayoutEffect可以拿到最新的dom节点，并且如果在此时对dom
    // 进行样式的修改,这些修改做出的更新会被一次性渲染到屏幕上,只有一次回流\重绘的代价
    if (count === 0) {
      setCount(182);
      // 虽然也会执行2次setState，但是页面只会渲染一次，不会造成页面的闪动
      // 1.clisk setState
      // 2.虚拟dom设置到真实dom
      // 执行useLayouteffect
      // setState
      // 虚拟dom设置到真实dom
      // 渲染
    }
  }, [count]);
  console.log("render", count);

  // 验证useState
  const StateTime = () => {
    const [count, setCount] = useState(5);
    useEffect(() => {
      setTimeout(() => {
        setCount(3);
        console.log("count" + count); //思考:为何还是5?
        // fun组件中,对state读取的方式不是this,这使得每次setTimout都读取了当时渲染闭包环境的数据,最新的值,跟着最新你的渲染改变了,旧的渲染里状态依然是旧值
      }, 0);
    }, []);
    console.log(count); // 5--->3   render了2次,在新的渲染里,状态才是最新的
    return <div>{count}</div>;
  };
  return (
    <div>
      {/* <IndexChildren getDate={getDate}></IndexChildren> */}
      {/* {num2} */}

      <h1>useLayouteffect和useEffect的区别</h1>

      {/* <div
        onClick={() => {
          setCount(0);
        }}
      >
        count:{count}
      </div> */}

      <StateTime />
    </div>
    // <div>
    //   <Button onClick={AddFn}>Add</Button>
    //   {state.count}

    //   <div>当前num1:{num1}</div>
    //   <div>当前num2:{num2}</div>
    //   <div>
    //     <Button
    //       onClick={() => {
    //         setNumb1(num1 + 1);
    //       }}
    //     >
    //       num1++
    //     </Button>
    //   </div>
    //   <div>当前expensive(依赖项num1):{expensive}</div>
    // </div>
  );
}

// 类组件和函数组件之间有什么区别？
//共同点：1.无论使用的是函数还是类组件，它都不能修改自己的props，因为react是单项数据流
// 函数式组件的性能比类要高
// 1.语法上：两者最明显的区别就是在语法上，函数组件是一个纯函数，它接受一个props对象返回一个react元素，而类组件需要去继承React.Componet并且创建render函数
// 返回react元素，这会需要更多代码，但是他们实现的效果都是相同的：所以函数时组件的性能比类组件要高
//2.状态管理
//   1. 因为函数式组件是一个纯函数，组件中没有this，不能再组件中使用setState()，这也是为什么叫做无状态组件，但是react16.8后推出了react-hook完美解决了这一点
// useState
//3. 生命周期钩子
//  1.不能再函数式组件中使用生命周期钩子，原因和sta一样，所有的生命周期钩子都继承于React.Component
// 可以使用useEffect钩子添加合适的依赖项
// 从hooks推出，可以看出作者更加看重函数组件，而且react团队提到过之后的版本将会对函数组件的性能方面进行提升~
//4.调用方式
//使用类组件，需要先用new 操作符将其实例化，然后调用生成示例的render方法
//如果是函数式组件，直接调用即可

// 说一下你对state和props的理解
// state
//1. 一个组件的显示形态可以由数据状态和外部参数所决定，而数据状态就是state，类组件一般再 constructor 中初始化，函数式组件使用useState初始化
//2.当需要修改state需要调用 setState来改变，从而到达更新组件内部数据的作用，并且会重新渲染组件
//3.类组件的state可以接受第二个参数，是一个函数，会在statestate调用完成并且组件开始渲染时被调用，可以来解决异步的问题
// 如果是函数式组件的话，需要使用定时器或者在 reducer使得state脱离react的掌控，变成同步更改，也可以使用useCallback和useEffect进行监听更新
// --->拓展 为什么setState是异步的
// setState 异步（批量更新）的一个重要动机就是避免频繁的 render，react运行时，setState异步的实现方式，有点类似于事件循环，每进来一个setState，就把他塞进一个队列里，
// 等时机成熟，再把队列里的state结果做合并，最后只正对最新的state走一次更新流程，这个过程就叫做批量更新

//props
// 1.react核心思想就是组件化思想，页面会被切分成一些独立的，可复用的组件，组件从概念上来看就说一个函数，可以接受一个参数作为输入值，这个参数就说props，所以可以将props理解为从
// 外部传入组件内部的数据
//2.react是单项数据流，所以它的主要作用是从父组件向子组件传递树
//3.props除了可以传递字符串，数字，还可以是对象，数组，回调函数
//4.在子组件中，props在内部是不可变的，只有通过父组件传递方法进行由父组件自己修改，因为react是单向数据流

// 相同点
// 1.两者都是js对象
//2. 两者都是用来保存数据
//3. props和state都会触发 更新后重新渲染
// 区别
//1. props是外部传递给组件的，state是由本组件自己管理的
//2.props在组件内部是不可改的，state在本组件内部可以
//3.state是多变的可更新的

// react加入Hooks的意义是什么？
//1.Hook是 react16.8新增的特性，它可以让我们在不编写class的情况下使用state以及其他的React特性
//2.组件之间的逻辑状态难以复用
//3.大型复杂的组件很难拆分
//3.class语法的使用并不友好

// 2022-9-26 2022面试题之react  https://www.cnblogs.com/xuqichun/p/16517528.html
// 1.react hooks的userLayouteffect 和 useEffect 的区别
// 1.useEffect在DOM渲染到屏幕之后执行 useLayouteffect在DOM结构更新后，渲染前执行，相当于有一个防抖效果
// 2.useLayouteffect 总是比 useEffect先执行，useLayouteffect里面的任务最好影响了Layout(布局)与音译 布局副作用函数,与componentDidMount执行时机等价
// 举例子：根据上述特性，可以预计到如果在useEffect种顺时连续更新某个状态，那么页面会发生多次渲染
// <div onClick={()=>setCount(count+1)}>{conut}</div>
// useEffect(()=>{
// if()
// },[count])

// 2.react hooks 为什么不能在循环和条件判断语句种使用
// 因为react采取的是链表来管理所有的hooks，一旦在条件语句中声明hooks,在每一次的组件更新，如果链表结构与上一次的结构不同，里面缓存的hooks信息与当前不一致，如果涉及到读取state等操作，就会发生异常

// 3.setState是同步的还是异步的
// react为了性能优化，将所有的setState统一，一次性进行更改，所以体现为异步，但是在原生环境下或者是react类式组件的生命周期下为同步，或者是脱离了react的掌控(reduer,settimeout/interval)下为同步

// 4.react的合成事件？react事件和原生事件的区别？
// react合成事件是React模拟原生DOM事件所有能力的一个事件对象，react的事件是绑定到document上面，而原生的事件是绑定到dom上，相对绑定的地方来说，dom上的事件是要优先于document上的事件执行，react的事件对象
// 是合成对象，不是原生的
// 什么是事件对象？
// 系统在调用处理程序时，把事件会发生的一切信息都会封装成一个对象，然后作为一个参数event传递给事件处理程序，而这个对象就是事件对象。
// react在事件处理上具有如下优点
// 1.几乎所有的事件都代理到document，达到性能优化的目的
// 2.对于每种类型的事件，统一使用分发函数分发事件
// 3.事件对象是合成对象，不是原生的

// 5.useCallback的用途？
// useCallback首先会返回一个缓存的函数，具有一个依赖项，只有当依赖项更改之后，缓存的这个函数，才会重新执行，避免了因为state更改render后，很多函数的无意义计算和调用，降低了渲染开销，优化程序的性能

// 6.react hooks中 useCallback 和 useMemo
/**
 * useCallback和useMemo接受的参数都是一样的，第一个参数都为回调，第二个参数都是依赖项
 * 共同作用：只有当依赖项发生变化，才会重新调用，起到了缓存的作用,useCallback缓存函数，useMemo缓存返回值
 * 都是为了优化性能，降低渲染开销，避免很多无意义的计算和函数调用
 */
//

// 7.有了解过 shouldComponetUpdate 吗？
/**
 * 在react开发中，我们需要经常对state状态进行更改，但是这种方式每当seState的时候，都会将组件重新渲染一遍，这样会出现重复渲染render的问题。
 * 使用shouldComponentUpdate可以解决这个问题，shouldCompoenntUpdate会返回一个布尔值，指定react是否应该据继续渲染，默认值是为true，
 *该方法有两个参数 nextProps表示下一个props  nextState表示下一个state
 */

//8.如何使用hooks来实现 shouldCompoenntUpdate ？
//  可以使用useMemo，返回DOM元素，只有当依赖项发生变化的时候才会进行渲染更新，就可以解决重复渲染和多余渲染问题

// 9.你能说一下react中 使用class组件 或者函数组件 要怎么通信？
// 1.react是单项数据流，他的数据流都是从外层传到内层的，父组件通过props向子组件通信，子组件通过父组件通信在子组件上绑定的回调函数进行向上通信
// 2.涉及到了多层跨组件传值，一般我是使用Context，Context提供了一种在组件之间共享此类值的方式，不必通过组件树的逐层传递props（跨级传值，状态共享）
// 一般都是创建一个单独的Context文件，使用createContext创建的对象的Provider组件包裹顶级组件，通过value属性绑定需要共享的状态
// 子组件引入Context对象，作为参数，通过hooks useContext拿到共享的状态~
// 3.使用redux，一般我都是使用react-redux，提供的useDispatch，useSelector进行通信
// 4.路由跳转传值通信
// 5.缓存sessionStorage、localStorage

// 10.react中的hooks解决了什么问题，为什么要hooks？
//1.可以自定义hooks从组件中提取状态逻辑，解决了在组件之间复用状态很难的问题
// 2.将组件中互相关联的不发拆分成更小的函数，解决了复杂组件的问题，还可以使用useReducer来管理组件内部的状态
// 2.在非class的情况下使用更多的React特性，解决了class组件和函数组件有差异的问题
// 3.清爽优雅的代码风格+代码量更小，更容易维护
//4.难以理解的class，不用再去考虑this指向的问题
//5.react官方也提倡使用react-hooks
// hooks带来的最大好处就是：逻辑复用，能够让函数式组件有自己的状态，以及状态更新后重新render

// 2022 9-28  https://blog.csdn.net/weixin_43972437/article/details/117399682

//1.如何模拟类组件的生命周期？
//1. 模拟componentDidMount 和 componentDidUpdate ，useEffect 依赖不填写（挂载后和render后）
// 2.模拟 componentDidMount ，useEffect 依赖为 [] （挂载后）
// 3.模拟componentUpdate， useEffect 无依赖，或者依赖[a,b]（更新）
// 4.模拟componentWillUnMount，useEffect返回一个处理函数或者表达式（卸载）

//2.react hooks性能优化
//1. 使用useMemo缓存数据，useCallback 缓存函数，避免不必要的计算和调用函数，优化程序的性能，降低渲染成本

//3.你遇到过哪些坑？
//1.useEffect 依赖引用类型会出现死循环
//2.父子通信，在useEffect中修改state，会导致死循环,(拓展----> 我使用useRef和useCallback，useEffect自定义了一个hooks，借助ref更改了，页面不会重新render的特性，避免了死循环)
//setState是异步的,批量的，很容易就导致，在组件通信的时候，明明修改了state，但是内层组件并没有更新（拓展----->在函数式组件中，只要让setate脱离了react的掌控，就会变成同步修改，settimeot，reducer,合成事件,生命周期,宏任务和微任务中
// 再拓展------> react为了性能考虑,由于state更新了,就会重新render,react内部会将多个setstate的调用合并成一个来执行,所以为什么我刚才说的是批量的,如果对同一个state进行多次setstate,setState的批量策略会对其进行覆盖,取最后一次的执行
// ）

// 4.react-hooks解决了哪些问题?
//1.状态逻辑拆分复用难的问题:函数本身就具有逻辑简单,易复用的特性
//2.生命周期繁复的问题,hooks屏蔽了生命周期的概念呢,一切逻辑都是由状态驱动,理解和操作起来就会清晰明了,代码的可维护性也会变的更高
//3.最亮眼的是自定义hooks----一种封装复用的设计模式,使得项目的可维护性和可拓展性大大的提高
