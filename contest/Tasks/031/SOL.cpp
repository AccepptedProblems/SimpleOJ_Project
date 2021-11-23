#include <bits/stdc++.h>
#define maxn 100003
#define ln 1000000003

using namespace std;

int n, x, y, MAXX = -ln, MAXY = -ln, MINX = ln, MINY = ln;
int a[maxn];
long long ans = 0;

int main()
{
    freopen("inp.txt", "r", stdin);
    freopen("out.txt", "w", stdout);
    cin >> n;
    for(int i=1; i<=n; i++)
        cin >> a[i];
    sort(a+1, a+n+1);
    int u = a[(n+1)/2];
    for(int i=1; i<=n; i++)
        ans += abs(a[i] - u);
    cout << ans;
}
