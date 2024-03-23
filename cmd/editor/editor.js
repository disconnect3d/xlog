import {mergeRegister} from '@lexical/utils';
import {
    createEmptyHistoryState,
    registerHistory
} from '@lexical/history';
import {
    HeadingNode,
    QuoteNode,
    registerRichText,
    $createHeadingNode,
    $createQuoteNode
} from '@lexical/rich-text';
import {CodeNode} from '@lexical/code';
import {ListNode, ListItemNode} from '@lexical/list';
import {LinkNode} from '@lexical/link';
import {
    createEditor,
    $createParagraphNode,
    $createTextNode,
    $getRoot
} from 'lexical';
import {
    $convertFromMarkdownString,
    $convertToMarkdownString,
    registerMarkdownShortcuts,
    TRANSFORMERS,
} from '@lexical/markdown';

window.Editor = function(dom, markdown) {
    const editor = createEditor({
        namespace: 'Editor',
        nodes: [
            HeadingNode,
            QuoteNode,
            CodeNode,
            ListNode,
            ListItemNode,
            LinkNode,
        ],
        onError: (error) => { throw error }
    });

    editor.setRootElement(dom);

    registerMarkdownShortcuts(editor, TRANSFORMERS);
    mergeRegister(
        registerRichText(editor),
        registerHistory(editor, createEmptyHistoryState(), 300),
    );

    editor.update(() => $convertFromMarkdownString(markdown, TRANSFORMERS))

    // editor.registerUpdateListener(({editorState}) => {
    //     editorState.read(() => {
    //         const markdown = $convertToMarkdownString(TRANSFORMERS);
    //         console.log(markdown);
    //     })
    //     console.log(editorState.toJSON());
    // });

}
