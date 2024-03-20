import './style.css'

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

function prepopulatedRichText() {
  const root = $getRoot();
  if (root.getFirstChild() !== null) {
    return;
  }
  // root.append(paragraph);
}

const editorRef = document.getElementById('editor');
const initialConfig = {
    namespace: 'Editor',
    nodes: [
        HeadingNode,
        QuoteNode,
        CodeNode,
        ListNode,
        ListItemNode,
        LinkNode,
    ],
    onError: (error) => {
        throw error;
    },
    theme: {},
};
const editor = createEditor(initialConfig);
editor.setRootElement(editorRef);
registerMarkdownShortcuts(editor, TRANSFORMERS);

// Registring Plugins
mergeRegister(
    registerRichText(editor),
    registerHistory(editor, createEmptyHistoryState(), 300),
);

editor.update(prepopulatedRichText, {tag: 'history-merge'});

editor.registerUpdateListener(({editorState}) => {
    console.clear()
    editorState.read(() => {
        const markdown = $convertToMarkdownString(TRANSFORMERS);
        console.log(markdown);
    })
    console.log(editorState.toJSON());
});
