import Breadcreumb from "./components_function/Breadcreumb.js";
import Nodes from "./nodes/Nodes.js";
import {request} from "./api.js";
import ImageView from "./components_function/ImageView.js";
import Loading from "./components_function/Loading.js";

const cache = {};

export default function App ($app)  {
    //상태값은 root인지, 현재 node값들, 몇번때 폴더인지
    this.state = {
        isRoot: true,
        nodes: [],
        depth: [],
        selectedFilePath: null, //이미지 파일이 있을 경우
        isVisible : false,
        isLoading : true,
    };

    const loading = new Loading({$app, initialState: this.state.isLoading});

    //상태 객체 중 몇번째 폴더인지만 보냄
    const breadcreumb = new Breadcreumb({
        $app, initialState: this.state.depth
    });


    //이미지 파일에 대한 호출
    const imageview = new ImageView({
        $app, initialState: {
            selectedFilePath : this.state.selectedFilePath,
            isVisible : this.state.isVisible,
        }
    });

    //노드 폴더값 호출
    const nodes = new Nodes({
        $app, initialState: {
            isRoot: this.state.isRoot,
            nodes: this.state.nodes
        },
        onClick: async(node) => {
            try{
                loading.setState({...this.state, isLoading: true});
                if(node.type === "DIRECTORY"){
                    if(cache[node.id]){
                        this.setState({
                            ...this.state,
                            isRoot: false,
                            depth: [...this.state.depth, node],
                            nodes: cache[node.id],
                            isVisible: false,
                        });
                    }else{
                    //폴더일 경우
                    const nextNodes = await request(node.id);
                        this.setState({
                            ...this.state,
                            isRoot : false,
                            nodes: nextNodes,
                            depth: [...this.state.depth, node],
                            isVisible: false,
                        });
                    cache[node.id] = nextNodes;
                    }
                }else if(node.type === "FILE"){
                    //파일일 경우
                    this.setState({
                        ...this.state,
                        selectedFilePath: node.filePath,
                        isVisible : true,
                    });
                }
            }catch (e) {
                throw new Error(e);
            } finally {
                this.setState({
                    ...this.state,
                    isLoading: false,
                });
            }
        }, //폴더 클릭 시 이동이 필요하기 때문에 해당 onclick 객체 값도 보내줘야 함
        onBackClick: async () => {
            try {
                loading.setState({...this.state, isLoading: true});
                //이전 state 복사해 처리
                const prevState = {...this.state}
                prevState.depth.pop();

                const prevNodeId = prevState.depth.length === 0 ? null : prevState.depth[prevState.depth.length - 1].id;
                //Root로 온 경우 이므로, Root 처리
                if(prevNodeId == null){
                    const rootNodes = await cache.root || request();
                    this.setState({
                        ...prevState,
                        isRoot: true,
                        nodes: rootNodes,
                        isVisible: false,
                    });
                }else {
                    const prevNodes = await cache[prevNodeId] || request(prevNodeId);
                    this.setState({
                        ...prevState,
                        isRoot: false,
                        nodes: prevNodes,
                        isVisible: false,
                    });
                }

            }catch (e) {
                throw new Error(e);
            }finally {
                this.setState({
                    ...this.state,
                    isLoading: false,
                });
            }
        } //더 이상 이동이 불가능한 경우들을 위해 막는 기능 추가
    });

    //상태값 변경 시 저장 (상단 네비와 하단 node 값도 같이 변경을 시켜줘야 함)
    this.setState = (nextState) => {
        this.state = nextState;
        breadcreumb.setState(this.state.depth);
        nodes.setState({
            isRoot: this.state.isRoot,
            nodes: this.state.nodes
        });
        imageview.setState({
            selectedFilePath : this.state.selectedFilePath,
            isVisible : this.state.isVisible
        });
        loading.setState(this.state.isLoading);
    };


    //api 호출 상태값 화면 불러오기
    const init = async () => {
        try {
            const rootNodes = await request(); //최초에는 api값이 없기 때문에 request로 보냄
            this.setState({
                ...this.state,
                isRoot: true, //최초에는 root이기 때문에 true가 맞음
                nodes: rootNodes, //최고 api 폴더 값을 저장
                depth: [], //root가 처음 이기 때문에 배열이 없음
                selectedFilePath: null,
                isVisible: false,
            });
            cache.root = rootNodes;
        }catch (e) {
            throw new Error(e);
        } finally {
            this.setState({
                ...this.state,
                isLoading: false,
            });
        }
    }

    init();
};
