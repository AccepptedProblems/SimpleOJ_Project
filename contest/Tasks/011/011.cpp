#include <bits/stdc++.h>

using namespace std;

const int N = 100010;

int n;
int a[N];

int main() {
  freopen("inp.txt", "r", stdin);
  freopen("out.txt", "w", stdout);
  scanf("%d", &n);
  for (int i = 1; i <= n; i++) {
    int u;
    scanf("%d", &u);
    a[u] = 1;
  }
  for (int i = 1; i <= n; i++) {
    if (!a[i]) {
      puts("NO");
      return 0;
    }
  }
  puts("YES");
  return 0;
}

