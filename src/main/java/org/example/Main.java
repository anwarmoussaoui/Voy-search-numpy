package org.example;

import org.graalvm.polyglot.*;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.*;

public class Main {

    private static final String BASE_URL = "https://docs.python.org/3/library/math.html";
    private static final String WASM_PATH = "./src/main/resources/voy_search_bg.wasm";
    private static final String JS_MODULE = "/voy.js";
    private static final int CHUNK_SIZE = 30;

    public static void main(String[] args) {
        try (Context context = createPolyglotContext();
             Scanner scanner = new Scanner(System.in)) {

            List<Map<String, String>> texts = scrapePythonMathDocs();

            loadWasmModule(context);
            context.eval(Source.newBuilder("js", Main.class.getResource(JS_MODULE))
                    .mimeType("application/javascript+module")
                    .build());

            System.out.print("Enter your search query: ");
            String query = scanner.nextLine();

            performChunkedSearch(context, texts, query, scanner);

            System.out.println("Search is over.");
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    private static Context createPolyglotContext() {
        Map<String, String> options = new HashMap<>();
        options.put("js.webassembly", "true");
        options.put("js.text-encoding", "true");

        return Context.newBuilder("js", "wasm")
                .allowAllAccess(true)
                .options(options)
                .build();
    }

    private static List<Map<String, String>> scrapePythonMathDocs() throws IOException {
        Document doc = Jsoup.connect(BASE_URL).get();
        Elements rows = doc.select("table.docutils tr");

        List<Map<String, String>> result = new ArrayList<>();
        int id = 1;

        for (Element row : rows) {
            Elements columns = row.select("td");
            if (columns.size() == 2) {
                Element link = columns.get(0).selectFirst("a.reference.internal");
                Element desc = columns.get(1).selectFirst("p");

                if (link != null && desc != null) {
                    Map<String, String> item = new HashMap<>();
                    item.put("id", String.valueOf(id++));
                    item.put("title", link.text());
                    item.put("url", BASE_URL + link.attr("href"));
                    item.put("text", desc.text());
                    result.add(item);
                }
            }
        }
        return result;
    }

    private static void loadWasmModule(Context context) throws IOException {
        byte[] wasmfile = Files.readAllBytes(Paths.get(WASM_PATH));
        context.getBindings("js").putMember("wasmfile", wasmfile);
    }

    private static void performChunkedSearch(Context context, List<Map<String, String>> texts, String query, Scanner scanner) {
        int total = texts.size();

        for (int i = 0; i < total; i += CHUNK_SIZE) {
            int end = Math.min(i + CHUNK_SIZE, total);
            List<Map<String, String>> chunk = texts.subList(i, end);

            context.getBindings("js").getMember("runVoySearch").execute(chunk, query);

            System.out.println("\nDid you find the results you're looking for? (yes to finish, enter to continue)");
            String answer = scanner.nextLine().trim().toLowerCase();

            if ("yes".equals(answer)) {
                break;
            }
        }
    }
}
